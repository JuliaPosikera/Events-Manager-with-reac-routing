import { json, useLoaderData } from "react-router-dom";

import EventsList from "../components/EventsList";

function EventsPage() {
  // const events = useLoaderData();
  const data = useLoaderData();
  // if (data.isError) {
  //   return <p>{data.message}</p>;
  // }
  const events = data.events;
  return <EventsList events={events} />;
}

export default EventsPage;

export async function loader() {
  const response = await fetch("http://localhost:8080/events");
  if (!response.ok) {
    // return { isError: true, message: "Can't fetch the data!" };
    // throw { message: "Can't fetch the data!" };
    // throw new Response(JSON.stringify({ message: "Can't fetch the data!" }), {
    //   status: 500,
    // });
    throw json({ message: "Can't fetch the data!" }, { status: 500 });
  } else {
    // const resData = await response.json();
    // return resData.events;
    return response;
  }
}
