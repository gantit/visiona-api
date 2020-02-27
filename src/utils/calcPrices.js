const items = [
  { name: 'Foodetector Perimetral', providerPrice: 69 },
  { name: 'Perimetral Optex', providerPrice: 79 },
  { name: 'Detector Shock Sensor', providerPrice: 19 },
  { name: 'Magnético', providerPrice: 19 },
  { name: 'Fotodetector', providerPrice: 39 },
  { name: 'Fotodetector IPDE', providerPrice: 39 },
  { name: 'Volumétrico', providerPrice: 35 },
  { name: 'Sirena', providerPrice: 19 },
  { name: 'Mando', providerPrice: 19 },
  { name: 'Pulsador', providerPrice: 19 },
  { name: 'Verisure ME', providerPrice: 19 },
  { name: 'Detector de Humo', providerPrice: 29 },
  { name: 'Detector de Agua', providerPrice: 19 },
  { name: 'Cámara CloudCam Pro', providerPrice: 99 },
  { name: 'Cámara Samsung', providerPrice: 41 },
  { name: 'Domótico Radio', providerPrice: 39 },
  { name: 'Tag Reader', providerPrice: 19 },
  { name: 'Llave magnética', providerPrice: 2 },
  { name: 'Teclado', providerPrice: 49 },
  { name: 'DDI', providerPrice: 39 },
  { name: 'Kit premium hogar', providerPrice: 49 },
  { name: 'Kit premium Negocio', providerPrice: 39 },
  { name: 'Pack premium video', providerPrice: 90 },
  { name: 'Cerradura domótica', providerPrice: 49 },
];

const priceCalc = (price) => ({
  min: Math.round(price + (price / 2)),
  medium: Math.round(price * 2),
  max: Math.round(price * 3),
});

const newItems = items.map((item) => ({
  ...item,
  description: 'bla bla bla',
  img: 'http://visiona.cloudinary.com/',
  price: priceCalc(items.providerPrice),
}));

export {
  newItems,
  priceCalc,
  items,
};
