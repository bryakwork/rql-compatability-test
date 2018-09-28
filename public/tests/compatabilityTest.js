define(['rql/query', 'rql/js-array', 'dojo/_base/lang', 'https://cdn.jsdelivr.net/npm/lodash@4.17.11/lodash.min.js'], function (Query, jsArray, lang, _) {
	const {assert} = intern.getPlugin('chai'),
		{registerSuite} = intern.getPlugin('interface.object');

	const users = [
			{
				"id": "5bacfee08134d4646fd8741e",
				"isActive": 1,
				"balance": "$1,077.29",
				"age": 34,
				"eyeColor": "blue",
				"firstName": "Ollie",
				"lastName": "Molina",
				"phone": "+1 (936) 438-3595",
				"registered": "Sunday, October 4, 2015 7:16 PM",
				"latitude": 27.168643,
				"longitude": 78.60084,
				"favoriteFruit": "banana"
			},
			{
				"id": "5bacfee1ebb6e18749ca9c3c",
				"isActive": 1,
				"balance": "$1,937.59",
				"age": 30,
				"eyeColor": "blue",
				"firstName": "Vance",
				"lastName": "Le",
				"phone": "+1 (929) 568-2093",
				"registered": "Sunday, April 17, 2016 6:07 PM",
				"latitude": 32.065845,
				"longitude": 142.185785,
				"favoriteFruit": "pear"
			},
			{
				"id": "5bacfee1c3639b168d814237",
				"isActive": 0,
				"balance": "$3,697.39",
				"age": 38,
				"eyeColor": "brown",
				"firstName": "Barry",
				"lastName": "Jimenez",
				"phone": "+1 (984) 423-3034",
				"registered": "Monday, February 9, 2015 8:54 AM",
				"latitude": 16.979361,
				"longitude": 89.915774,
				"favoriteFruit": "apple"
			},
			{
				"id": "5bacfee1162cc4055b6fd810",
				"isActive": 1,
				"balance": "$2,174.27",
				"age": 40,
				"eyeColor": "brown",
				"firstName": "Whitaker",
				"lastName": "Gill",
				"phone": "+1 (845) 494-2235",
				"registered": "Thursday, June 11, 2015 2:31 PM",
				"latitude": -75.177066,
				"longitude": -149.434758,
				"favoriteFruit": "pear"
			},
			{
				"id": "5bacfee19831aea0643ddb96",
				"isActive": 0,
				"balance": "$2,493.41",
				"age": 20,
				"eyeColor": "brown",
				"firstName": "Mcfadden",
				"lastName": "Pennington",
				"phone": "+1 (876) 436-2499",
				"registered": "Tuesday, April 7, 2015 4:26 AM",
				"latitude": 67.211107,
				"longitude": 168.920175,
				"favoriteFruit": "apple"
			},
			{
				"id": "5bacfee1e32fc6e8f65c805e",
				"isActive": 0,
				"balance": "$3,221.50",
				"age": 25,
				"eyeColor": "blue",
				"firstName": "Deloris",
				"lastName": "Charles",
				"phone": "+1 (925) 524-3773",
				"registered": "Wednesday, December 23, 2015 5:37 PM",
				"latitude": 47.146024,
				"longitude": -48.160715,
				"favoriteFruit": "pear"
			},
			{
				"id": "5bacfee1bc88b9b445deca55",
				"isActive": 1,
				"balance": "$1,558.97",
				"age": 40,
				"eyeColor": "green",
				"firstName": "Elva",
				"lastName": "Palmer",
				"phone": "+1 (842) 593-2977",
				"registered": "Sunday, February 19, 2017 8:57 AM",
				"latitude": 68.948356,
				"longitude": 136.642013,
				"favoriteFruit": "pear"
			},
			{
				"id": "5bacfee18c9d3ecbd106c102",
				"isActive": 1,
				"balance": "$2,145.46",
				"age": 31,
				"eyeColor": "brown",
				"firstName": "Carrie",
				"lastName": "Stuart",
				"phone": "+1 (924) 568-2105",
				"registered": "Saturday, November 1, 2014 12:12 AM",
				"latitude": 27.599061,
				"longitude": 44.040932,
				"favoriteFruit": "strawberry"
			},
			{
				"id": "5bacfee12639386f0953b3df",
				"isActive": 0,
				"balance": "$3,439.80",
				"age": 23,
				"eyeColor": "brown",
				"firstName": "Mayer",
				"lastName": "Hull",
				"phone": "+1 (908) 509-3710",
				"registered": "Sunday, April 30, 2017 11:22 AM",
				"latitude": -73.515847,
				"longitude": 149.571285,
				"favoriteFruit": "banana"
			},
			{
				"id": "5bacfee1fef364626c25c9ff",
				"isActive": 1,
				"balance": "$2,872.71",
				"age": 36,
				"eyeColor": "green",
				"firstName": "Isabel",
				"lastName": "Frost",
				"phone": "+1 (845) 559-3416",
				"registered": "Sunday, December 18, 2016 2:56 PM",
				"latitude": 30.712382,
				"longitude": 109.588313,
				"favoriteFruit": "strawberry"
			},
			{
				"id": "5bacfee19bb3a5ebb649965c",
				"isActive": 0,
				"balance": "$1,681.51",
				"age": 27,
				"eyeColor": "brown",
				"firstName": "Stark",
				"lastName": "Mann",
				"phone": "+1 (909) 464-2145",
				"registered": "Saturday, July 25, 2015 1:41 AM",
				"latitude": 83.501764,
				"longitude": 175.247711,
				"favoriteFruit": "pear"
			},
			{
				"id": "5bacfee1db7bdaa95369c66b",
				"isActive": 0,
				"balance": "$2,727.91",
				"age": 40,
				"eyeColor": "green",
				"firstName": "Autumn",
				"lastName": "Roman",
				"phone": "+1 (913) 522-3545",
				"registered": "Monday, July 14, 2014 5:22 PM",
				"latitude": 23.438074,
				"longitude": 114.961302,
				"favoriteFruit": "banana"
			},
			{
				"id": "5bacfee1cb056862315bc6f2",
				"isActive": 1,
				"balance": "$1,800.98",
				"age": 36,
				"eyeColor": "green",
				"firstName": "Nellie",
				"lastName": "Donaldson",
				"phone": "+1 (870) 590-3591",
				"registered": "Wednesday, January 22, 2014 12:38 PM",
				"latitude": 5.995259,
				"longitude": 165.832892,
				"favoriteFruit": "banana"
			},
			{
				"id": "5bacfee1ddd32f28f92b102c",
				"isActive": 1,
				"balance": "$3,266.34",
				"age": 20,
				"eyeColor": "green",
				"firstName": "Elizabeth",
				"lastName": "Hays",
				"phone": "+1 (845) 504-3074",
				"registered": "Saturday, January 24, 2015 12:44 AM",
				"latitude": -42.360999,
				"longitude": -71.907995,
				"favoriteFruit": "strawberry"
			},
			{
				"id": "5bacfee1ae07ac306fb30c60",
				"isActive": 0,
				"balance": "$2,747.00",
				"age": 23,
				"eyeColor": "brown",
				"firstName": "Lynnette",
				"lastName": "Michael",
				"phone": "+1 (837) 489-2141",
				"registered": "Wednesday, August 1, 2018 4:02 AM",
				"latitude": 84.035968,
				"longitude": 61.69863,
				"favoriteFruit": "apple"
			},
			{
				"id": "5bacfee1a08fcf0f44c1a4d6",
				"isActive": 1,
				"balance": "$3,581.30",
				"age": 33,
				"eyeColor": "brown",
				"firstName": "Nguyen",
				"lastName": "Boyd",
				"phone": "+1 (984) 460-3804",
				"registered": "Monday, July 14, 2014 12:03 AM",
				"latitude": -53.603734,
				"longitude": -137.752634,
				"favoriteFruit": "apple"
			},
			{
				"id": "5bacfee15bc7ccc13c33a530",
				"isActive": 1,
				"balance": "$1,135.24",
				"age": 29,
				"eyeColor": "green",
				"firstName": "Britney",
				"lastName": "Shepherd",
				"phone": "+1 (838) 450-2054",
				"registered": "Thursday, March 3, 2016 4:13 PM",
				"latitude": 3.048274,
				"longitude": 82.118413,
				"favoriteFruit": "pear"
			},
			{
				"id": "5bacfee17af0751852ff9ecc",
				"isActive": 0,
				"balance": "$1,670.22",
				"age": 30,
				"eyeColor": "green",
				"firstName": "Lea",
				"lastName": "Marsh",
				"phone": "+1 (996) 508-3986",
				"registered": "Monday, January 12, 2015 7:07 PM",
				"latitude": -26.970452,
				"longitude": 99.768199,
				"favoriteFruit": "pear"
			},
			{
				"id": "5bacfee142a454f806f3e0c8",
				"isActive": 1,
				"balance": "$1,033.21",
				"age": 32,
				"eyeColor": "brown",
				"firstName": "Ora",
				"lastName": "Beck",
				"phone": "+1 (865) 478-3776",
				"registered": "Monday, July 7, 2014 1:19 AM",
				"latitude": -36.235635,
				"longitude": -68.16712,
				"favoriteFruit": "banana"
			},
			{
				"id": "5bacfee1ff3b1a3c8cf1d5eb",
				"isActive": 1,
				"balance": "$3,976.25",
				"age": 25,
				"eyeColor": "brown",
				"firstName": "Hoover",
				"lastName": "Olsen",
				"phone": "+1 (913) 489-2935",
				"registered": "Saturday, October 17, 2015 6:46 AM",
				"latitude": -78.691136,
				"longitude": 35.352737,
				"favoriteFruit": "apple"
			}
		],
		testDatastoreUrl = '/api/datastore/test-datastore-csv',
		//testDatastoreUrl = '/api/datastore/test-datastore-db',
		datastoreRequestHeaders = new Headers([
			['Accept', 'application/json'],
			['Content-Type', 'application/json']
		]);

	function checkQueryResultsEquality(query) {
		return new Promise((resolve, reject) => {
			fetch(new Request(`${testDatastoreUrl}?${query}`, {
					'method': 'GET',
					headers: datastoreRequestHeaders,
				})
			).then(
				(datastoreResponse) => {
					const usersCopy = lang.clone(users),
						jsArrayResult = _.sortBy(jsArray.query(query, {}, usersCopy), [function (obj) {
							return obj.id;
						}]);
					datastoreResponse.text().then((responseText) => {
						const datastoreResult = _.sortBy(JSON.parse(responseText), [function (obj) {
								return obj.id;
							}]),
							differencesArray = _.differenceWith(jsArrayResult, datastoreResult, _.isEqual);
						try {
							assert.isEmpty(differencesArray);
							resolve();
						} catch (error) {
							reject(error)
						}
					});
				},
				(error) => {
					reject(error)
				}
			)
		});
	}

	registerSuite('RQL Implementations Compatability Test', {
		tests: {
			'general nodes compatability': {
				'datastore is ready'() {
					this.skip();
					const deletePromises = [],
						putPromises = [];
					//delete all previous contents of datastore
					return new Promise((resolve, reject) => {
						// fetch(new Request(testDatastoreUrl, {
						// 		method: 'GET',
						// 		headers: datastoreRequestHeaders
						// 	})
						// ).then((response) => {
						// 	response.text().then((responseText) => {
						// 		const storeContents = JSON.parse(responseText);
						// 		if (storeContents.length > 0) {
						// 			for (const entry of storeContents.values()) {
						// 				deletePromises.push(fetch(new Request(`${testDatastoreUrl}/${entry.id}`, {
						// 					method: 'DELETE',
						// 					headers: datastoreRequestHeaders
						// 				})));
						// 			}
						// 		}
						// 	});
						// });
						Promise.all(deletePromises).then(() => {
							//put new data in datastore
							for (let i = 0; i < users.length; i++) {
								putPromises.push(fetch(new Request(testDatastoreUrl, {
									method: 'POST',
									headers: datastoreRequestHeaders,
									body: JSON.stringify(users[i])
								})));
							}
							resolve();
						});
						Promise.all(putPromises).then(() => {
							resolve()
						});
					})
				},
				'"select" node is compatible'() {
					const selectQueryString = 'select(id,firstName,phone)';
					return checkQueryResultsEquality(selectQueryString);
				},

				'"limit" node is compatible'() {
					const limitQueryString = 'limit(3,0)';
					return new Promise((resolve, reject) => {
						fetch(new Request(`${testDatastoreUrl}?${limitQueryString}`, {
								'method': 'GET',
								headers: datastoreRequestHeaders,
							})
						).then((datastoreResponse) => {
							const usersCopy = lang.clone(users),
								jsArrayResult = jsArray.query(limitQueryString, {}, usersCopy);
							datastoreResponse.text().then((responseText) => {
								const datastoreResult = JSON.parse(responseText);
								try {
									assert.equal(jsArrayResult.length, datastoreResult.length);
									resolve();
								} catch (error) {
									reject(error)
								}
							});
						})
					});
				},

				'"sort" node is compatible'() {
					const limitQueryString = 'sort(+latitude)';
					return new Promise((resolve, reject) => {
						fetch(new Request(`${testDatastoreUrl}?${limitQueryString}`, {
								'method': 'GET',
								headers: datastoreRequestHeaders,
							})
						).then((datastoreResponse) => {
							const usersCopy = lang.clone(users),
								jsArrayResult = jsArray.query(limitQueryString, {}, usersCopy);
							datastoreResponse.text().then((responseText) => {
								const datastoreResult = JSON.parse(responseText),
									differencesArray = _.differenceWith(jsArrayResult, datastoreResult, _.isEqual);
								try {
									assert.isEmpty(differencesArray);
									resolve();
								} catch (error) {
									reject(error)
								}
							});
						})
					});
				},
				'"in" node is compatible'() {
					const limitQueryString = 'in(eyeColor,(green,brown))';
					return checkQueryResultsEquality(limitQueryString);
				},
				'"out" node is compatible'() {
					const limitQueryString = 'out(favoriteFruit,(banana,apple))';
					return checkQueryResultsEquality(limitQueryString);
				},
				'"and" node is compatible'() {
					const limitQueryString = 'and(in(eyeColor,(green,blue)),out(favoriteFruit,(pear,apple)))';
					return checkQueryResultsEquality(limitQueryString);
				},
				'"not" node is compatible'() {
					const limitQueryString = 'not(in(eyeColor,(green,brown)))';
					return checkQueryResultsEquality(limitQueryString);
				},
				'"or" node is compatible'() {
					const limitQueryString = 'or(in(eyeColor,(green,brown)),in(favoriteFruit,(banana,apple)))';
					return checkQueryResultsEquality(limitQueryString);
				},
				'"eq" node is compatible'() {
					const limitQueryString = 'eq(firstName,Britney)';
					return checkQueryResultsEquality(limitQueryString);
				},
				'"ge" node is compatible'() {
					const limitQueryString = 'ge(latitude,-36)';
					return checkQueryResultsEquality(limitQueryString);
				},
				'"gt" node is compatible'() {
					const limitQueryString = 'gt(longitude,71)';
					return checkQueryResultsEquality(limitQueryString);
				},
				'"le" node is compatible'() {
					const limitQueryString = 'le(age,33)';
					return checkQueryResultsEquality(limitQueryString);
				},
				'"lt" node is compatible'() {
					const limitQueryString = 'lt(age,60)';
					return checkQueryResultsEquality(limitQueryString);
				},
				'"ne" node is compatible'() {
					const limitQueryString = 'ne(id,5bacfee12639386f0953b3df)';
					return checkQueryResultsEquality(limitQueryString);
				},
				'"match" node is compatible with "like" in PHP'() {
					//'match is converted to 'like' in datastores
					const limitQueryString = 'match(firstName,a)';
					return checkQueryResultsEquality(limitQueryString);
				},
				'"contains" node is compatible'() {
					const limitQueryString = 'contains(id,4)';
					return checkQueryResultsEquality(limitQueryString);
				},
			},
			//'"like" and '
		}
	});
});