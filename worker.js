export default {
  async fetch(request, env) {

    const url = new URL(request.url);

    // Show form page
    if (
      request.method === "GET" &&
      url.pathname === "/"
    ) {

      return new Response(
        await env.ASSETS.fetch(request)
      );
    }

    // Insert data
    if (
      request.method === "POST" &&
      url.pathname === "/submit"
    ) {

      const data = await request.json();

      const name = data.name;
      const email = data.email;

      await env.DB.prepare(
        `
        INSERT INTO users
        (name,email)
        VALUES (?,?)
        `
      )
      .bind(name,email)
      .run();

      return new Response(
        "Data inserted successfully"
      );
    }

    return new Response(
      "Not Found",
      {status:404}
    );
  }
};