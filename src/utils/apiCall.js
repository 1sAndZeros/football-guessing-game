function sleep(delay) {
  const start = new Date().getTime();
  while (new Date().getTime() < start + delay);
}

export default async function apiCall() {
  console.time('Time my API call');
  // set some variables
  const baseUrl = `https://api-football-v1.p.rapidapi.com/v3/players?league=39&season=2022&page=`;
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '78c11c5206msh35d616d3cb546d7p1666f8jsndff4df0cc545',
      'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com',
    },
  };
  // create empty array where we want to store the players objects for each loop
  const players = [];
  let page = 1;
  let pages = 3;
  do {
    // try catch to catch any errors in the async api call
    try {
      // use node-fetch to make api call
      const resp = await fetch(`${baseUrl}${page}`, options);
      const data = await resp.json();
      // push response data to players array
      pages = data.paging.total || 0;
      players.push(...data.response);
      // increment the page with 1 on each loop
      sleep(5000);
      page += 1;
    } catch (err) {
      console.error(`Oops, something is wrong ${err}`);
      pages = 0;
    }
    // keep running until there's no next page
  } while (page <= pages);
  // let's log out our new players array
  console.log(players);
  console.timeEnd('Time my API call');
}
