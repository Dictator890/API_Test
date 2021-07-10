import axios from "axios";

async function requestImage(querystring) {
  let url = `https://pixabay.com/api/`;
  try {
    const result = await axios.get(url, {
      params: {
        key: "<PIXBAY_API_KEY>",
        q: encodeURIComponent(querystring),
        image_type: "photo",
      },
    });
    let array_data = [];
    result.data?.hits.forEach((element) => {
      array_data.push(element.webformatURL);
    });

    return Promise.resolve(array_data);
  } catch (error) {
    return Promise.reject(error);
  }
}

async function requestVideo(querystring) {
  let url = `https://pixabay.com/api/videos/`;
  try {
    const result = await axios.get(url, {
      params: {
        key: "<PIXBAY_API_KEY>",
        q: encodeURIComponent(querystring),
      },
    });
    let array_data = [];
    result.data?.hits.forEach((element) => {
      array_data.push(element.videos.small.url);
    });
    return Promise.resolve(array_data);
  } catch (error) {
    return Promise.reject(error);
  }
}

async function requestText(query) {
  let url = "https://www.googleapis.com/customsearch/v1";

  try {
    const result = await axios.get(url, {
      params: {
        key: "<GOOGLE_CUSTOM_SEARCH_API_KEY>",
        cx: "<PROGRAMMABLE_ENGINE_ID>",
        q: encodeURIComponent(query),
      },
    });
    let array_data = [];
    console.log(result.data);
    result.data?.items?.forEach((element) => {
      let new_data = {
        url: element.link,
        title: element.title,
        snippet: element.snippet,
      };
      array_data.push(new_data);
    });
    return Promise.resolve(array_data);
  } catch (error) {
    return Promise.reject(error);
  }
}

const export_var = { requestImage, requestVideo, requestText };
export default export_var;
