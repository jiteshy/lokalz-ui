export const Title = ({ title }: { title: string }) => {
  const [first, ...rest] = title.split(" ");
  const restJoined = rest.join(" ");

  return (
    <h2 className="ui-max-w-lg ui-mb-6 ui-font-sans ui-text-3xl ui-font-bold ui-leading-none ui-tracking-tight ui-text-deep-purple-accent-700 sm:ui-text-4xl md:ui-mx-auto">
      <span className="ui-relative ui-inline-block">
        <svg
          viewBox="0 0 52 24"
          fill="currentColor"
          className="ui-absolute ui-top-0 ui-left-0 ui-z-0 ui-w-32 -ui-mt-8 -ui-ml-20 ui-text-blue-gray-100 lg:ui-w-32 lg:-ui-ml-28 lg:-ui-mt-10 ui-block"
        >
          <defs>
            <pattern
              id="27df4f81-c854-45de-942a-fe90f7a300f9"
              x="0"
              y="0"
              width=".135"
              height=".30"
            >
              <circle cx="1" cy="1" r=".7" />
            </pattern>
          </defs>
          <rect
            fill="url(#27df4f81-c854-45de-942a-fe90f7a300f9)"
            width="52"
            height="24"
          />
        </svg>
        <span className="ui-relative">{first}</span>
      </span>{" "}
      {restJoined}
    </h2>
  );
};
