/*
 * File: autocomplete.example.js
 *
 * Desc: sample js for fetching search results from JSON endpoints
 *
 */
const wikiUrl = 'https://en.wikipedia.org';
const params = 'action=query&list=search&format=json&origin=*';

new Autocomplete('#autocomplete', {

  // Search function can return a promise
  // which resolves with an array of
  // results. In this case we're using
  // the Wikipedia search API.
  search: input => {
    const url = `${wikiUrl}/w/api.php?${
    params
    }&srsearch=${encodeURI(input)}`;

    return new Promise(resolve => {
      if (input.length < 3) {
        return resolve([]);
      }

      fetch(url).
      then(response => response.json()).
      then(data => {
        resolve(data.query.search);
      });
    });
  },

  // Control the rendering of result items.
  // Let's show the title and snippet
  // from the Wikipedia results
  renderResult: (result, props) => `
    <li ${props}>
      <div class="wiki-title">
        ${result.title}
      </div>
      <div class="wiki-snippet">
        ${result.snippet}
      </div>
    </li>
  `,

  // Wikipedia returns a format like this:
  //
  // {
  //   pageid: 12345,
  //   title: 'Article title',
  //   ...
  // }
  //
  // We want to display the title
  getResultValue: result => result.title,

  // Open the selected article in
  // a new window
  onSubmit: result => {
    window.open(`${wikiUrl}/wiki/${
    encodeURI(result.title)
    }`);
  } });
