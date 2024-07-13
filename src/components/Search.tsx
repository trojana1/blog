import Fuse from "fuse.js";
import { useState, useRef } from "preact/hooks";

type Props = {
    [k: string]: any;
};

const options = {
    keys: ["data.title", "data.summary"],
    includeMatches: true,
    minMatchCharLength: 2,
    threshold: 0.5,
};

const debounce = (callback: (...args: any) => void, delay: number) => {
    let timeout: any;
    return function (...args: any[]) {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            callback(...args);
        }, delay);
    };
};

export default function Search(props: Props) {
    const [results, setResults] = useState<any[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);

    function onSearch(query: string) {
        console.log(props.posts);
        const fuse = new Fuse(props.posts, options);
        const result = fuse.search(query);
        setResults(result);
    }

    const onInput = debounce((ev: any) => {
        if (ev?.target?.value) {
            onSearch(ev.target.value);
        }
    }, 150);

    return (
        <div>
            <div class="relative mb-2">
                <input
                    ref={inputRef}
                    class="prose my-4 w-full max-w-none rounded-md border-1 p-1 indent-8"
                    type="text"
                    onInput={(ev) => onInput(ev)}
                    placeholder="Search..."
                ></input>
                <div class="absolute left-2 top-1/2 -translate-y-1/2  fill-gray-400 stroke-gray-400 stroke-1">
                    {props.icon}
                </div>
            </div>
            {results.length ? (
                <div class="pb-4">
                    {results.length} results for {inputRef.current?.value}
                </div>
            ) : null}
            <div class="flex flex-col space-y-4">
                {results.map((result) => {
                    const item = result.item;
                    return (
                        <a href={`/blog/posts/${item.slug}`}>
                            <div class="prose prose-slate max-w-none rounded-md border border-gray-500 p-4 transition-transform dark:prose-invert hover:-translate-y-2 hover:translate-x-2">
                                <h3>
                                    {item.data.title} -{" "}
                                    {new Intl.DateTimeFormat("en-US", {
                                        dateStyle: "medium",
                                    }).format(Date.parse(item.data.created))}
                                </h3>
                                <p>{item.data.summary}</p>
                            </div>
                        </a>
                    );
                })}
            </div>
        </div>
    );
}
