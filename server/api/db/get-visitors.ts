export default defineEventHandler(async (event) => {
  // return await getVisitors();

  const url = "http://ip.jsontest.com/";

  return await event.$fetch(url, {
    method: "get"
  });
});
