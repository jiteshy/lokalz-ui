export const Title = ({ title }: { title: string }) => {
  const [first, ...rest] = title.split(" ");
  const restJoined = rest.join(" ");

  return (
    <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-deep-purple-accent-700 sm:text-4xl md:mx-auto">
      <span className="relative inline-block">
        <svg
          viewBox="0 0 52 24"
          fill="currentColor"
          className="absolute top-0 left-0 z-0 w-32 -mt-8 -ml-20 text-blue-gray-100 lg:w-32 lg:-ml-28 lg:-mt-10 block"
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
        <span className="relative">{first}</span>
      </span>{" "}
      {restJoined}
    </h2>
  );
};
