import { siVodafone, siWipro } from 'simple-icons';

/**
 * Track record shown on /tentang. Every fact here comes from the founder's own professional
 * profile; add or edit entries here, not in the page. Keep names and numbers exactly as stated.
 */
export const stats = [
  { value: '10+', label: 'tahun pengalaman sebagai engineer' },
  { value: '329+', label: 'proyek global untuk klien enterprise' },
  { value: '95%+', label: 'tingkat keberhasilan proyek' },
  { value: '82+', label: 'kemenangan kompetisi UI/UX dan frontend' },
] as const;

export interface Client {
  name: string;
  /** SVG path (24x24 viewBox) or an image under /public. Without either, the name shows as text. */
  path?: string;
  src?: string;
}

/**
 * Clients as given by the founder. Logos are monochrome versions of the files in public/clients/
 * (public/images/clients/); where none was uploaded, the name shows as text. Brand names and marks
 * belong to their owners.
 */
export const clients: Client[] = [
  { name: 'IBM', src: '/images/clients/ibm.png' },
  { name: 'GE', src: '/images/clients/ge-oil-gas.png' },
  { name: 'Topcoder', src: '/images/clients/topcoder.png' },
  { name: 'Distributed.com', src: '/images/clients/distributed.png' },
  { name: 'Vodafone', path: siVodafone.path },
  { name: 'Wipro', path: siWipro.path },
  { name: 'ABB', src: '/images/clients/abb.png' },
  { name: 'Cisco', src: '/images/clients/cisco.png' },
  { name: 'Hewlett Packard Enterprise', src: '/images/clients/hewlett-packard.png' },
  { name: 'BT', src: '/images/clients/bt.png' },
  { name: 'Manulife', src: '/images/clients/manulife.png' },
  { name: 'Comcast', src: '/images/clients/comcast.png' },
  { name: 'PepsiCo', src: '/images/clients/pepsico.png' },
  { name: 'Chevron', src: '/images/clients/chevron.png' },
  { name: 'Canon', src: '/images/clients/canon.png' },
  { name: 'Eaton', src: '/images/clients/eaton.png' },
  { name: 'Zurich', src: '/images/clients/zurich.png' },
  { name: 'John Hancock', src: '/images/clients/john-hancock.png' },
  { name: 'Ferguson', src: '/images/clients/ferguson.png' },
  { name: 'U.S. Department of Energy', src: '/images/clients/us-energy.png' },
  { name: 'PLN', src: '/images/clients/pln.png' },
  { name: 'Socfindo', src: '/images/clients/socfindo.png' },
  { name: 'Pemprovsu', src: '/images/clients/pemprovsu.png' },
  { name: 'Korlantas', src: '/images/clients/korlantas.png' },
  { name: 'Kemala Bhayangkari', src: '/images/clients/kemala-bhayangkari.png' },
  { name: 'Kemenpar', src: '/images/clients/kemenpar.png' },
  { name: 'HubDrajacoffee', src: '/images/clients/hub-draja.png' },
  { name: 'Alta Ski School', src: '/images/clients/alta-ski.png' },
  { name: 'Chill Bill', src: '/images/clients/chill-bill.png' },
  { name: 'Estrada', src: '/images/clients/estrada.png' },
  { name: 'Global Greens', src: '/images/clients/global-greens.png' },
  { name: 'Halo', src: '/images/clients/halo.png' },
  { name: 'MSC', src: '/images/clients/msc.png' },
  { name: 'Nterprisers', src: '/images/clients/nterprisers.png' },
  { name: 'Planet Freedom', src: '/images/clients/planet-freedom.png' },
  { name: 'RMA Architects', src: '/images/clients/rma.png' },
  { name: 'Sabatini Architects', src: '/images/clients/sabatini.png' },
  { name: 'ScrapsKC', src: '/images/clients/scrapskc.png' },
  { name: 'Titan', src: '/images/clients/titan.png' },
  { name: 'Treanor HL', src: '/images/clients/treanorhl.png' },
];
