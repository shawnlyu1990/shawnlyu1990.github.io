import { defineClientConfig } from "vuepress/client";
import Blog from "./layouts/Blog.vue";
import Layout from "./layouts/Layout.vue";

export default defineClientConfig({
    layouts: {
        Blog,
        Layout,
    },
});
