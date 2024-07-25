type onChangeHandler = (value: string) => void;

/**
 * Wraps a given function in a setTimeout call with the given milliseconds.
 * @param func The function to wrap.
 * @param wait The number of milliseconds to wait before executing.
 * @param args The function args.
 */
function delay<F extends onChangeHandler>(
  func: F,
  wait: number,
  value: string,
): NodeJS.Timeout {
  return setTimeout(function delayWrap() {
    return func(value);
  }, wait);
}

/**
 * Debounce function lifted from underscore.js.
 * @param func The function to wrap.
 * @param wait The number of milliseconds to wait.
 */
function underscoreDebounce<F extends onChangeHandler>(
  func: F,
  wait: number,
): onChangeHandler {
  let timeout: NodeJS.Timeout | null = null;

  const later = function later(value: string) {
    timeout = null;
    func(value);
  };

  return function debouncedFunction(value: string): void {
    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = delay(later, wait, value);
  };
}

export function DebouncedInput({
  label,
  placeholder,
  onInputChange,
}: {
  label: string;
  placeholder: string;
  onInputChange: onChangeHandler;
}): JSX.Element {
  const debouncedHandleChange = underscoreDebounce(onInputChange, 150);

  return (
    <label className="flex flex-col text-subtle">
      <span className="inline-block h-6 text-left text-sm font-semibold leading-none tracking-0.5px">
        {label}
      </span>
      <input
        type="text"
        placeholder={placeholder}
        onChange={(e: React.FormEvent<HTMLInputElement>) =>
          debouncedHandleChange((e.target as HTMLInputElement).value)
        }
        className="rounded-sm border-0 bg-subtle px-4 py-2 text-base text-default shadow-all placeholder:text-default placeholder:opacity-50"
      />
    </label>
  );
}
