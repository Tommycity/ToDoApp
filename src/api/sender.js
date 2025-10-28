const sender = async (url, request, values = null) => {
  let res;
  let response;

  try {
    if (request === "POST" || request === "PUT" || request === "PATCH") {
      res = await fetch(url, {
        method: request,
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
        },
      });
    } else if (request === "DELETE") {
      res = await fetch(url, {
        method: request,
      });
    }

    if (res) {
      if (res?.ok) {
        response = await res.json();
        return response;
      } else {
        return "Something went wrong. Try again";
      }
    }
  } catch (error) {
    const err = Error(error);
    return err?.message;
  }
};

export default sender;
