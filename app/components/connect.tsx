function ConnectButton() {
  return (
    <button
      type="button"
      className="absolute top-2 right-2 group inline-flex items-center rounded-lg sm:rounded-xl py-2 px-3 sm:py-2.5 sm:px-4 text-text-base/80 font-mono text-xs sm:text-sm font-semibold tracking-wide overflow-hidden transition-all duration-300 ease-out"
      onClick={() => {
        window.open("https://calendly.com/ankitzm/meet", "_blank");
      }}
    >
      <div className="absolute inset-0 bg-fade-green/80 rounded-lg transition-all duration-300 ease-out" />
      <span className="relative z-10">Work Together →</span>
    </button>
  );
}

export default ConnectButton;
