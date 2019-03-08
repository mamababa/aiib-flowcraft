import { category } from "./category";
import { task } from "./task";
import { craftReducer } from "akmii-yeeoffice-crafts";
import { chart } from "./chart";
import { aiib } from "./aiib";
export let reducers = {
    category,
    task,
    ...craftReducer,
    chart,
    aiib,
};
