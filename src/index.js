export default {
	async fetch(request, env, ctx) {
		const { pathname } = new URL(request.url);

		if (pathname === '/api/pc') {
			try {
				if (request.method === 'OPTIONS') {
					// Répondre à la requête OPTIONS avec les en-têtes CORS appropriés
					return new Response(null, {
						headers: {
							'Access-Control-Allow-Origin': '*',
							'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
							'Access-Control-Allow-Headers': 'Content-Type',
						},
					});
				} else if (request.method === 'POST') {
					const requestData = await request.json();
					const {
						numeroSerie,
						modele,
						anneeSortie,
						processeur,
						memoire,
						etat,
						capaciteStockage,
						couleur,
						typeLangueClavier,
						tailleEcran,
						cycleBatterie,
						touchBar,
						description,
						images,
						prix,
						vendu,
					} = requestData;
					console.log(requestData.images);
					// Insérer les données dans la table PCs
					const { results } = await env.DB.prepare(
						'INSERT INTO pc (numeroSerie, modele, anneeSortie, processeur, memoire, etat, capaciteStockage, couleur, typeLangueClavier, tailleEcran, cycleBatterie, touchBar, description, images,prix,vendu) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?)'
					)
						.bind(
							numeroSerie,
							modele,
							anneeSortie,
							processeur,
							memoire,
							etat,
							capaciteStockage,
							couleur,
							typeLangueClavier,
							tailleEcran,
							cycleBatterie,
							touchBar,
							description,
							images.join(';'),
							prix,
							vendu
						)
						.run();

					return new Response(JSON.stringify(results), {
						headers: {
							'Content-Type': 'application/json',
							'Access-Control-Allow-Origin': '*',
						},
					});
				} else if (request.method === 'GET') {
					const { results } = await env.DB.prepare('SELECT * FROM pc').run();

					return new Response(JSON.stringify(results), {
						headers: {
							'Content-Type': 'application/json',
							'Access-Control-Allow-Origin': '*',
						},
					});
				}
			} catch (error) {
				console.log(error);
				return new Response(`Erreur: ${error.message}`, {
					status: 500,
				});
			}
		}
		if (pathname.startsWith('/api/pc/')) {
			const url = new URL(request.url);
			const id = url.searchParams.get('id');

			try {
				if (request.method === 'OPTIONS') {
					// Répondre à la requête OPTIONS avec les en-têtes CORS appropriés
					return new Response(null, {
						headers: {
							'Access-Control-Allow-Origin': '*',
							'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
							'Access-Control-Allow-Headers': 'Content-Type',
						},
					});
				} else if (request.method === 'GET') {
					const { results } = await env.DB.prepare('SELECT * FROM pc WHERE numeroSerie=?').bind(id).run();

					if (results.length > 0) {
						return new Response(JSON.stringify(results), {
							headers: {
								'Content-Type': 'application/json',
								'Access-Control-Allow-Origin': '*',
							},
						});
					} else {
						return new Response(`Erreur: ${error.message}`, {
							status: 500,
						});
					}
				} else if (request.method === 'PUT') {
					const requestData = await request.json();
					const {
						modele,
						anneeSortie,
						processeur,
						memoire,
						etat,
						capaciteStockage,
						couleur,
						typeLangueClavier,
						tailleEcran,
						cycleBatterie,
						touchBar,
						description,
						images,
						prix,
						vendu,
					} = requestData;

					const { results } = await env.DB.prepare(
						`UPDATE pc SET
							modele = ?,
							anneeSortie = ?,
							processeur = ?,
							memoire = ?,
							etat = ?,
							capaciteStockage = ?,
							couleur = ?,
							typeLangueClavier = ?,
							tailleEcran = ?,
							cycleBatterie = ?,
							touchBar = ?,
							description = ?,
							images = ?,
							prix = ?,
							vendu = ?
							WHERE numeroSerie = ?`
					)
						.bind(
							modele,
							anneeSortie,
							processeur,
							memoire,
							etat,
							capaciteStockage,
							couleur,
							typeLangueClavier,
							tailleEcran,
							cycleBatterie,
							touchBar,
							description,
							images,
							prix,
							vendu,
							id
						)
						.run();

					return new Response(JSON.stringify(results), {
						headers: {
							'Content-Type': 'application/json',
							'Access-Control-Allow-Origin': '*',
						},
					});
				}
			} catch (error) {
				console.log(error);
				return new Response(`Erreur: ${error.message}`, {
					status: 500,
				});
			}
		}

		return new Response('Not Found 404');
	},
};
