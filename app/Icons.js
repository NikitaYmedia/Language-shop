const paths = {
  arrow: (
    <>
      <path d="M4 12h15" />
      <path d="m13 6 6 6-6 6" />
    </>
  ),
  cap: (
    <>
      <path d="M22 9.5 12 5 2 9.5 12 14l10-4.5z" />
      <path d="M6 11.8V16c3 2.4 9 2.4 12 0v-4.2" />
      <path d="M22 9.5V15" />
    </>
  ),
  pin: (
    <>
      <path d="M19.5 10c0 6-7.500 11.500-7.500 11.500S4.500 16 4.500 10a7.500 7.500 0 0 1 15 0z" />
      <circle cx="12" cy="10" r="2.700" />
    </>
  ),
  star: <path d="m12 3 2.700 5.600 6.100.9-4.400 4.300 1 6.100L12 17l-5.400 2.900 1-6.100-4.400-4.300 6.100-.9L12 3z" />,
  check: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m8 12.200 2.800 2.800L16 9.500" />
    </>
  ),
  monitor: (
    <>
      <rect x="3" y="4" width="18" height="12" rx="1.500" />
      <path d="M8 20h8M12 16v4" />
    </>
  ),
  book: (
    <>
      <path d="M12 6.500C10 5 7 4.500 3 4.500v14c4 0 7 .5 9 2 2-1.500 5-2 9-2v-14c-4 0-7 .5-9 2z" />
      <path d="M12 6.500v14" />
    </>
  ),
  heart: <path d="M12 20s-8-4.800-8-10.800A4.400 4.400 0 0 1 12 6.700a4.400 4.400 0 0 1 8 2.500C20 15.200 12 20 12 20z" />,
  whatsapp: (
    <>
      <path d="M3.500 20.500 5 16.200A8.500 8.500 0 1 1 8 19L3.500 20.500z" />
      <path d="M9.200 8.800c-.4 2.600 3.200 6.200 5.900 5.800l1-1.300-2-1-.9.600c-.9-.4-1.800-1.300-2.200-2.200l.6-.9-1-2-1.400 1z" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="1.500" />
      <path d="m3.500 7 8.500 6 8.500-6" />
    </>
  ),
  send: (
    <>
      <path d="M21 3 2.500 10.200l6.500 2.600L11.600 19.500 21 3z" />
      <path d="M9 12.800 21 3" />
    </>
  ),
  instagram: (
    <>
      <rect x="3.500" y="3.500" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="3.800" />
      <circle cx="17" cy="7" r=".7" fill="currentColor" />
    </>
  ),
};

export default function Icon({ name, size = 22 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}
