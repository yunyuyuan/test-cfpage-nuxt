import https from "https";

export default defineEventHandler(async (event) => {
  if (event.node.req.method?.toUpperCase() !== "POST") {
    throw createError({
      statusCode: 405,
      data: "Post only!"
    });
  }

  return await getVisitors(args.type);
});

function request (path: string, data: any) {
  if (!process.env.MONGODB_PWD || !process.env.MONGODB_USER) {
    throw new Error("Need Mongodb Atlas Authentication");
  }

  const url = process.env.MONGODB_ENDPOINT + path;
  const requestData = {
    ...data,
    dataSource: process.env.MONGODB_DATA_SOURCE,
    database: "nuxt3-blog",
    collection: "visitors"
  };
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      email: process.env.MONGODB_USER,
      password: process.env.MONGODB_PWD
    }
  };

  return new Promise<any>((resolve, reject) => {
    const req = https.request(url, options, (res) => {
      let responseData = "";

      res.on("data", (chunk) => {
        responseData += chunk;
      });

      res.on("end", () => {
        if (res.statusCode === 200) {
          resolve(JSON.parse(responseData));
        } else {
          reject(responseData);
        }
      });
    });

    req.on("error", (error) => {
      reject(error.message);
    });

    req.write(JSON.stringify(requestData));
    req.end();
  });
};

async function getVisitors (type: HeaderTabUrl) {
  const res = await request("/action/find", {
    filter: {
      ntype: type
    },
    projection: { _id: 0, nid: 1, nvisitors: 1 }
  });
  return res.documents;
}