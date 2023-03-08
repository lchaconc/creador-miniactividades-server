export default function normalizar(cadena) {
    const sinEspacios = cadena.replace(/\s+/g, '');

    const acentos = {'á':'a','é':'e','í':'i','ó':'o','ú':'u','Á':'A','É':'E','Í':'I','Ó':'O','Ú':'U', 'Ü':'U','ü':'u'};
	const sinAcento =  sinEspacios.split('').map( letra => acentos[letra] || letra).join('').toString();	
    const final = sinAcento.toLowerCase();

    return final; 
}