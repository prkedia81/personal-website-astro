import { fetchPageBlocks } from "../services/notion";

const blocks = (await fetchPageBlocks(id)) as BlockObjectResponse[];
