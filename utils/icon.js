import axios from "axios";

export async function getVueSnippet(icon) {
  console.log(icon);
  const { data } = await axios.get(`/icons/${icon}`);
  return `
  <template>
    ${data}
  </template>
  <script>
  export default {
    name: '${icon.replace(".svg", "")}'
  }
  </script>`;
}

export async function getSvgSnippet(icon) {
  const { data } = await axios.get(`/icons/${icon}`);
  return data;
}

export async function getReactSnippet(icon) {
  const { data } = await axios.get(`/icons/${icon}`);
  return `
    export function ${icon.replace(".svg", "")}(props) {
      return (
        ${data}
      )
    }`;
}
