export default defineEventHandler(async (event) => {
  return await getVisitors();
});

async function request(path: string, data: any) {
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

  const res = await $fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      email: process.env.MONGODB_USER,
      password: process.env.MONGODB_PWD
    },
    body: requestData
  });
  return res as any;
};

export async function getVisitors () {
  const res = await request("/action/find", {
    filter: {
      ntype: "/articles"
    },
    projection: { _id: 0, nid: 1, nvisitors: 1 }
  });
  return res.documents;
}