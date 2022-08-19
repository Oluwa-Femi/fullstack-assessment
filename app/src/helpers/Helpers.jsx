const colors = [
  'bg-red-500',
  'bg-yellow-500',
  'bg-green-500',
  'bg-blue-500',
  'bg-indigo-500',
  'bg-pink-500',
  'bg-fuchsia-500',
];

const Helpers = {
  // dynamically generate random background colors based on design specification
  randomizeColor: () => {
    return colors[Math.floor(Math.random() * colors.length)];
  },
  generateGreeting: () => {
    const hour = new Date().getHours();
    if (hour < 12) {
      return 'Good Morning,';
    } else if (hour >= 12 && hour < 17) {
      return 'Good Afternoon,';
    } else {
      return 'Good Evening,';
    }
  },
  // parse strings into lowercase and remove whitespace
  parseWhitespace: (string) => {
    return string.split(' ').join('').toLowerCase();
  },
  // for pagination reasons
  urlBuilder: ({ path = '/', query = {}, offset = 0 }) => {
    let url = path;

    for (let prop in query) {
      url += `${[prop]}=${query[prop]}&`;
    }

    if (offset) {
      url += `?offset=${offset}`;
    }

    return url;
  },
};

export default Helpers;
