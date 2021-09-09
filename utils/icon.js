import axios from "axios";

export async function getSvg(icon, color) {
  const { data } = await axios.get(`/icons/${icon}`);
  if (color) {
    return data.replace(/#212121/g, color);
  }
  return data;
}

export async function svgToVue(svgString, iconName) {
  return `
  <template>
    ${svgString}
  </template>
  <script>
  export default {
    name: '${iconName.replace(".svg", "")}'
  }
  </script>`;
}

export async function svgToReact(svgString, iconName) {
  return `
  export function ${iconName.replace(".svg", "")}(props) {
    return (
      ${svgString}
    )
  }`;
}

export async function getIconSnippet(type, icon, color) {
  if (!icon) return;
  switch (type) {
    case "svg":
      return await getSvg(icon, color);
    case "vue":
      return svgToVue(await getSvg(icon, color), icon);
    case "react":
      return svgToReact(await getSvg(icon, color), icon);
  }
}
