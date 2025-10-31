export const WelcomeMessage = () => {
  return (
    <section className="text-center max-w-[720px]">
      <h1 className="text-3xl font-semibold mb-2">
        Welcome to the Storybook Component Library
      </h1>
      <p className="text-gray-600 mb-5">
        This playground showcases reusable UI components. Use Storybook to
        explore components, props, and states.
      </p>
      <div className="flex gap-3 justify-center flex-wrap">
        <a
          href="http://localhost:6006"
          target="_blank"
          rel="noreferrer"
          className="px-3.5 py-2 rounded-lg border border-gray-200 no-underline hover:bg-gray-50">
          Storybook
        </a>
        <a
          href="https://github.com/midjiro/storybook-component-library"
          target="_blank"
          rel="noreferrer"
          className="px-3.5 py-2 rounded-lg border border-gray-200 no-underline hover:bg-gray-50">
          Docs
        </a>
      </div>
    </section>
  );
};
