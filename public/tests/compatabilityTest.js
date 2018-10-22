define([
	'rql/query',
	'dojo/_base/lang',
	'https://cdn.jsdelivr.net/npm/lodash@4.17.11/lodash.min.js',
	'rgrid/store/QueryableMemoryStore',
	'rgrid/store/QueryableStore',
], function (Query, lang, _, QueryableMemoryStore, QueryableRestStore) {
	const {assert} = intern.getPlugin('chai'),
		{registerSuite} = intern.getPlugin('interface.object');

	const testCollection = [
			{
				"id": "5bacfee08134d4646fd8741e",
				"isActive": true,
				"balance": "$1,077.29",
				"age": 34,
				"eyeColor": "blue",
				"firstName": "Ollie",
				"lastName": "Molina",
				"phone": "+1 (936) 438-3595",
				"registered": "Sunday, October 4, 2015 7:16 PM",
				"latitude": 27.168643,
				"longitude": 78.60084,
				"favoriteFruit": "banana",
				"notes": null
			},
			{
				"id": "5bacfee1ebb6e18749ca9c3c",
				"isActive": true,
				"balance": "$1,937.59",
				"age": 30,
				"eyeColor": "blue",
				"firstName": "Vance",
				"lastName": "Le",
				"phone": "+1 (929) 568-2093",
				"registered": "Sunday, April 17, 2016 6:07 PM",
				"latitude": 32.065845,
				"longitude": 142.185785,
				"favoriteFruit": "pear",
				"notes": null
			},
			{
				"id": "5bacfee1c3639b168d814237",
				"isActive": false,
				"balance": "$3,697.39",
				"age": 38,
				"eyeColor": "brown",
				"firstName": "Barry",
				"lastName": "Jimenez",
				"phone": "+1 (984) 423-3034",
				"registered": "Monday, February 9, 2015 8:54 AM",
				"latitude": 16.979361,
				"longitude": 89.915774,
				"favoriteFruit": "apple",
				"notes": null
			},
			{
				"id": "5bacfee1162cc4055b6fd810",
				"isActive": true,
				"balance": "$2,174.27",
				"age": 40,
				"eyeColor": "brown",
				"firstName": "Whitaker",
				"lastName": "Gill",
				"phone": "+1 (845) 494-2235",
				"registered": "Thursday, June 11, 2015 2:31 PM",
				"latitude": -75.177066,
				"longitude": -149.434758,
				"favoriteFruit": "pear",
				"notes": null
			},
			{
				"id": "5bacfee19831aea0643ddb96",
				"isActive": false,
				"balance": "$2,493.41",
				"age": 20,
				"eyeColor": "brown",
				"firstName": "Mcfadden",
				"lastName": "Pennington",
				"phone": "+1 (876) 436-2499",
				"registered": "Tuesday, April 7, 2015 4:26 AM",
				"latitude": 67.211107,
				"longitude": 168.920175,
				"favoriteFruit": "apple",
				"notes": null
			},
			{
				"id": "5bacfee1e32fc6e8f65c805e",
				"isActive": false,
				"balance": "$3,221.50",
				"age": 25,
				"eyeColor": "blue",
				"firstName": "Deloris",
				"lastName": "Charles",
				"phone": "+1 (925) 524-3773",
				"registered": "Wednesday, December 23, 2015 5:37 PM",
				"latitude": 47.146024,
				"longitude": -48.160715,
				"favoriteFruit": "pear",
				"notes": null
			},
			{
				"id": "5bacfee1bc88b9b445deca55",
				"isActive": true,
				"balance": "$1,558.97",
				"age": 40,
				"eyeColor": "green",
				"firstName": "Elva",
				"lastName": "Palmer",
				"phone": "+1 (842) 593-2977",
				"registered": "Sunday, February 19, 2017 8:57 AM",
				"latitude": 68.948356,
				"longitude": 136.642013,
				"favoriteFruit": "pear",
				"notes": null
			},
			{
				"id": "5bacfee18c9d3ecbd106c102",
				"isActive": true,
				"balance": "$2,145.46",
				"age": 31,
				"eyeColor": "brown",
				"firstName": "Carrie",
				"lastName": "Stuart",
				"phone": "+1 (924) 568-2105",
				"registered": "Saturday, November 1, 2014 12:12 AM",
				"latitude": 27.599061,
				"longitude": 44.040932,
				"favoriteFruit": "strawberry",
				"notes": null
			},
			{
				"id": "5bacfee12639386f0953b3df",
				"isActive": false,
				"balance": "$3,439.80",
				"age": 23,
				"eyeColor": "brown",
				"firstName": "Mayer",
				"lastName": "Hull",
				"phone": "+1 (908) 509-3710",
				"registered": "Sunday, April 30, 2017 11:22 AM",
				"latitude": -73.515847,
				"longitude": 149.571285,
				"favoriteFruit": "banana",
				"notes": 'notNullValue'
			},
			{
				"id": "5bacfee1fef364626c25c9ff",
				"isActive": true,
				"balance": "$2,872.71",
				"age": 36,
				"eyeColor": "green",
				"firstName": "Isabel",
				"lastName": "Frost",
				"phone": "+1 (845) 559-3416",
				"registered": "Sunday, December 18, 2016 2:56 PM",
				"latitude": 30.712382,
				"longitude": 109.588313,
				"favoriteFruit": "strawberry",
				"notes": 'notNullValue'
			},
			{
				"id": "5bacfee19bb3a5ebb649965c",
				"isActive": false,
				"balance": "$1,681.51",
				"age": 27,
				"eyeColor": "brown",
				"firstName": "Stark",
				"lastName": "Mann",
				"phone": "+1 (909) 464-2145",
				"registered": "Saturday, July 25, 2015 1:41 AM",
				"latitude": 83.501764,
				"longitude": 175.247711,
				"favoriteFruit": "pear",
				"notes": null
			},
			{
				"id": "5bacfee1db7bdaa95369c66b",
				"isActive": false,
				"balance": "$2,727.91",
				"age": 40,
				"eyeColor": "green",
				"firstName": "Autumn",
				"lastName": "Roman",
				"phone": "+1 (913) 522-3545",
				"registered": "Monday, July 14, 2014 5:22 PM",
				"latitude": 23.438074,
				"longitude": 114.961302,
				"favoriteFruit": "banana",
				"notes": null
			},
			{
				"id": "5bacfee1cb056862315bc6f2",
				"isActive": true,
				"balance": "$1,800.98",
				"age": 36,
				"eyeColor": "green",
				"firstName": "Nellie",
				"lastName": "Donaldson",
				"phone": "+1 (870) 590-3591",
				"registered": "Wednesday, January 22, 2014 12:38 PM",
				"latitude": 5.995259,
				"longitude": 165.832892,
				"favoriteFruit": "banana",
				"notes": null
			},
			{
				"id": "5bacfee1ddd32f28f92b102c",
				"isActive": true,
				"balance": "$3,266.34",
				"age": 20,
				"eyeColor": "green",
				"firstName": "Elizabeth",
				"lastName": "Hays",
				"phone": "+1 (845) 504-3074",
				"registered": "Saturday, January 24, 2015 12:44 AM",
				"latitude": -42.360999,
				"longitude": -71.907995,
				"favoriteFruit": "strawberry",
				"notes": 'notNullValue'
			},
			{
				"id": "5bacfee1ae07ac306fb30c60",
				"isActive": false,
				"balance": "$2,747.00",
				"age": 23,
				"eyeColor": "brown",
				"firstName": "Lynnette",
				"lastName": "Michael",
				"phone": "+1 (837) 489-2141",
				"registered": "Wednesday, August 1, 2018 4:02 AM",
				"latitude": 84.035968,
				"longitude": 61.69863,
				"favoriteFruit": "apple",
				"notes": 'notNullValue'
			},
			{
				"id": "5bacfee1a08fcf0f44c1a4d6",
				"isActive": true,
				"balance": "$3,581.30",
				"age": 33,
				"eyeColor": "brown",
				"firstName": "Nguyen",
				"lastName": "Boyd",
				"phone": "+1 (984) 460-3804",
				"registered": "Monday, July 14, 2014 12:03 AM",
				"latitude": -53.603734,
				"longitude": -137.752634,
				"favoriteFruit": "apple",
				"notes": null
			},
			{
				"id": "5bacfee15bc7ccc13c33a530",
				"isActive": true,
				"balance": "$1,135.24",
				"age": 29,
				"eyeColor": "green",
				"firstName": "Britney",
				"lastName": "Shepherd",
				"phone": "+1 (838) 450-2054",
				"registered": "Thursday, March 3, 2016 4:13 PM",
				"latitude": 3.048274,
				"longitude": 82.118413,
				"favoriteFruit": "pear",
				"notes": null
			},
			{
				"id": "5bacfee17af0751852ff9ecc",
				"isActive": false,
				"balance": "$1,670.22",
				"age": 30,
				"eyeColor": "GREEN",
				"firstName": "LEA",
				"lastName": "MARSH",
				"phone": "+1 (996) 508-3986",
				"registered": "Monday, January 12, 2015 7:07 PM",
				"latitude": -26.970452,
				"longitude": 99.768199,
				"favoriteFruit": "pear",
				"notes": 'notNullValue'
			},
			{
				"id": "5bacfee142a454f806f3e0c8",
				"isActive": true,
				"balance": "$1,033.21",
				"age": 32,
				"eyeColor": "BROWN",
				"firstName": "ORA",
				"lastName": "BECK",
				"phone": "+1 (865) 478-3776",
				"registered": "Monday, July 7, 2014 1:19 AM",
				"latitude": -36.235635,
				"longitude": -68.16712,
				"favoriteFruit": "BANANA",
				"notes": null
			},
			{
				"id": "5bacfee1ff3b1a3c8cf1d5eb",
				"isActive": true,
				"balance": "$3,976.25",
				"age": 25,
				"eyeColor": "BROWN",
				"firstName": "HOOVER",
				"lastName": "OLSEN",
				"phone": "+1 (913) 489-2935",
				"registered": "Saturday, October 17, 2015 6:46 AM",
				"latitude": -78.691136,
				"longitude": 35.352737,
				"favoriteFruit": "apple",
				"notes": 'notNullValue'
			}
		],
		//testDatastoreUrl = '/api/datastore/test-datastore-csv',
		testDatastoreUrl = '/api/datastore/test-datastore-db',
		//testDatastoreUrl = '/api/datastore/test-datastore-remote-db',
		datastoreRequestHeaders = new Headers([
			['Accept', 'application/json'],
			['Content-Type', 'application/json']
		]),
		memoryStore = new QueryableMemoryStore({data: testCollection}),
		restStore = new QueryableRestStore({target: testDatastoreUrl});

	function checkQueryResultsEquality(query) {
		return new Promise((resolve, reject) => {
			asyncQueryDatastore(query).then(
				(datastoreResponse) => {
					try {
						const jsArrayResult = sortById(queryJsArray(query)),
							datastoreResult = sortById(datastoreResponse),
							differencesArray = _.differenceWith(jsArrayResult, datastoreResult, _.isEqual);
						assert.isEmpty(differencesArray, 'no differences in results');
						resolve();
					} catch (error) {
						reject(error)
					}
				},
				(error) => {
					reject(error)
				}
			)
		});
	}

	function asyncQueryDatastore(queryString) {
		return new Promise((resolve, reject) => {
			restStore.query(queryString).then((responseData) => {
					if (!responseData) {
						reject(new Error('REST Datastore responded with error'))
					}
					try {
						const normalData = normalizeData(responseData);
						resolve(normalData);
					} catch (error) {
						reject(error)
					}
				},
				(error) => {
					reject(error)
				})
		});
	}

	function normalizeData(data) {

		function normalizeValue(property, value) {
			const numericFields = ['latitude', 'longitude', 'age', 'isActive'];
			for (const fieldName of numericFields) {
				if (property === fieldName || property.includes(fieldName + '->')) {
					value = Number(value)
				}
			}
			return value;
		}

		if (Array.isArray(data)) {
			for (const item of data) {
				for (let key in item) {
					if (item.hasOwnProperty(key)) {
						item[key] = normalizeValue(key, item[key]);

					}
				}
			}
		} else {
			if (typeof data === 'object') {
				for (let key in data) {
					if (data.hasOwnProperty(key)) {
						data[key] = normalizeValue(key, data[key]);

					}
				}
			}
		}
		return data;
	}

	function queryJsArray(queryString) {
		return normalizeData(memoryStore.querySync(queryString));
	}

	function sortById(collection) {
		if (Array.isArray(collection)) {
			return _.sortBy(collection, [function (obj) {
				return obj.id;
			}]);
		} else {
			return collection;
		}
	}

	function asyncGetDifferenceBetweenTwoQueryResultsInRestStore(firstQueryString, secondQueryString) {
		return new Promise((resolve, reject) => {
			const firstResponsePromise = asyncQueryDatastore(firstQueryString),
				secondQueryResponsePromise = asyncQueryDatastore(secondQueryString);
			Promise.all([firstResponsePromise, secondQueryResponsePromise]).then(
				(responses) => {
					try {
						if (!responses[0] && !responses[1]) {
							reject(new Error('REST Datastore responded with error'))
						}
						const firstResult = sortById(responses[0]),
							secondResult = sortById(responses[1]),
							differencesArray = _.differenceWith(firstResult, secondResult, _.isEqual);
						resolve(differencesArray);
					} catch (error) {
						reject(error)
					}
				},
				(error) => {
					reject(error)
				}
			)
		});
	}

	function getDifferenceBetweenTwoQueryResultsInMemoryStore(firstQueryString, secondQueryString) {
		const firstResult = sortById(queryJsArray(firstQueryString)),
			secondResult = sortById(queryJsArray(secondQueryString));
		return _.differenceWith(firstResult, secondResult, _.isEqual);
	}

	registerSuite('RQL Implementations Compatability Test', {
		tests: {
			'general nodes compatability': {
				'datastore is ready'() {
					this.skip();
					const deletePromises = [],
						putPromises = [];
					//delete all previous contents of datastore
					//TODO: get it working normally
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
							for (let i = 0; i < testCollection.length; i++) {
								putPromises.push(fetch(new Request(testDatastoreUrl, {
									method: 'POST',
									headers: datastoreRequestHeaders,
									body: JSON.stringify(testCollection[i])
								})));
							}
							resolve();
						});
						Promise.all(putPromises).then(() => {
							resolve()
						});
					})
				},

				'"limit" node is compatible'() {
					//this.skip();
					const queryString = 'limit(3,0)';
					return new Promise((resolve, reject) => {
						asyncQueryDatastore(queryString).then((datastoreResponse) => {
							try {
								const jsArrayResult = queryJsArray(queryString);
								assert.equal(jsArrayResult.length, datastoreResponse.length);
								resolve();
							} catch (error) {
								reject(error)
							}
						})
					});
				},

				'"sort" node is compatible'() {
					//this.skip();
					const queryString = 'sort(+latitude)';
					return new Promise((resolve, reject) => {
						asyncQueryDatastore(queryString).then((datastoreResponse) => {
							try {
								const jsArrayResult = queryJsArray(queryString);
								const differencesArray = _.differenceWith(jsArrayResult, datastoreResponse, _.isEqual);

								assert.isEmpty(differencesArray);
								resolve();
							} catch (error) {
								reject(error)
							}
						})
					});
				},

				'"in" node is compatible'() {
					//this.skip();
					const queryString = 'in(firstName,(Ollie,Mcfadden,Deloris))';
					return checkQueryResultsEquality(queryString);
				},

				'"out" node is compatible'() {
					//this.skip();
					const queryString = 'out(lastName,(Jimenez,Palmer,Frost))';
					return checkQueryResultsEquality(queryString);
				},

				'"and" node is compatible'() {
					//this.skip();
					const queryString = 'and(in(eyeColor,(green,blue)),out(favoriteFruit,(pear,apple)))';
					return checkQueryResultsEquality(queryString);
				},

				'"not" node is compatible'() {
					//this.skip();
					const queryString = 'not(in(firstName,(Ollie,Mcfadden,Deloris)))';
					return checkQueryResultsEquality(queryString);
				},

				'"or" node is compatible'() {
					//this.skip();
					const queryString = 'or(in(eyeColor,(green,brown)),in(favoriteFruit,(banana,apple)))';
					return checkQueryResultsEquality(queryString);
				},

				'"eq" node is compatible'() {
					//this.skip();
					const queryString = 'eq(firstName,Britney)';
					return checkQueryResultsEquality(queryString);
				},

				'"ge" node is compatible'() {
					//this.skip();
					const queryString = 'ge(latitude,-36)';
					return checkQueryResultsEquality(queryString);
				},

				'"gt" node is compatible'() {
					//this.skip();
					const queryString = 'gt(longitude,71)';
					return checkQueryResultsEquality(queryString);
				},

				'"le" node is compatible'() {
					//this.skip();
					const queryString = 'le(age,33)';
					return checkQueryResultsEquality(queryString);
				},

				'"lt" node is compatible'() {
					//this.skip();
					const queryString = 'lt(age,60)';
					return checkQueryResultsEquality(queryString);
				},

				'"ne" node is compatible'() {
					//this.skip();
					const queryString = 'ne(id,5bacfee12639386f0953b3df)';
					return checkQueryResultsEquality(queryString);
				},

				'"like" node is compatible'() {
					//this.skip();
					const queryString = 'like(firstName,*e)';
					return checkQueryResultsEquality(queryString);
				},

				'"alike" node is compatible'() {
					//this.skip();
					const queryString = 'alike(id,*4*)';
					return checkQueryResultsEquality(queryString);
				},

				'"first" node is compatible'() {
					//this.skip();
					const queryString = 'first()';
					return new Promise((resolve, reject) => {
						asyncQueryDatastore(queryString).then(
							(responseItem) => {
								try {
									const memoryResponse = queryJsArray(queryString);
									assert.deepEqual(memoryResponse, responseItem, 'no difference in results')
								} catch (error) {
									reject(error)
								}
							},
							(error) => {
								reject(error)
							});
					})
				},

				'"one" node is compatible'() {
					//this.skip();
					const queryString = 'one()';
					return checkQueryResultsEquality(queryString);
				},

				'"distinct" node is compatible'() {
					//this.skip();
					const queryString = 'distinct()';
					return checkQueryResultsEquality(queryString);
				},

				'"values" node is compatible'() {
					//this.skip();
					const queryString = 'values(age)';
					return checkQueryResultsEquality(queryString);
				},

				'"isTrue" node is compatible'() {
					//this.skip();
					const queryString = 'isTrue(isActive)';
					return checkQueryResultsEquality(queryString);
				},

				'"isFalse" node is compatible'() {
					//this.skip();
					const queryString = 'isFalse(isActive)';
					return checkQueryResultsEquality(queryString);
				},

				'"isNull" node is compatible'() {
					//this.skip();
					const queryString = 'isNull(notes)';
					return checkQueryResultsEquality(queryString);
				},

			},
			'Case sensitivity compatability': {
				'"like" node is case-sensitive'() {
					//this.skip();
					const uppercaseQueryString = 'like(eyeColor,BROWN)',
						lowercaseQueryString = 'like(eyeColor,brown)';

					return new Promise((resolve, reject) => {
							const jsArrayDifferencesArray = getDifferenceBetweenTwoQueryResultsInMemoryStore(uppercaseQueryString, lowercaseQueryString);
							asyncGetDifferenceBetweenTwoQueryResultsInRestStore(uppercaseQueryString, lowercaseQueryString).then((datastoreDifferencesArray) => {
									try {
										assert.isNotEmpty(jsArrayDifferencesArray, "jsArray implementation is case-sensitive");
										assert.isNotEmpty(datastoreDifferencesArray, "datastore implementation is case-sensitive");
										resolve();
									} catch (error) {
										reject(error)
									}
								},
								(error) => {
									reject(error);
								});
						}
					)
				},
				'"alike" node is case-insensitive'() {
					//this.skip();
					const uppercaseQueryString = 'alike(eyeColor,BROWN)',
						lowercaseQueryString = 'alike(eyeColor,brown)';

					return new Promise((resolve, reject) => {
							const jsArrayDifferencesArray = getDifferenceBetweenTwoQueryResultsInMemoryStore(uppercaseQueryString, lowercaseQueryString);
							asyncGetDifferenceBetweenTwoQueryResultsInRestStore(uppercaseQueryString, lowercaseQueryString).then((datastoreDifferencesArray) => {
									try {
										assert.isEmpty(jsArrayDifferencesArray, "jsArray implementation is case-insensitive");
										assert.isEmpty(datastoreDifferencesArray, "datastore implementation is case-insensitive");
										resolve();
									} catch (error) {
										reject(error)
									}
								},
								(error) => {
									reject(error)
								}
							)
						},
					)
				},
				'"in" node is case-sensitive'() {
					//this.skip();
					const uppercaseQueryString = 'in(eyeColor,(BROWN,green))',
						lowercaseQueryString = 'in(eyeColor,(brown,green))';

					return new Promise((resolve, reject) => {
							const jsArrayDifferencesArray = getDifferenceBetweenTwoQueryResultsInMemoryStore(uppercaseQueryString, lowercaseQueryString);
							asyncGetDifferenceBetweenTwoQueryResultsInRestStore(uppercaseQueryString, lowercaseQueryString).then((datastoreDifferencesArray) => {
									try {
										assert.isNotEmpty(jsArrayDifferencesArray, "jsArray implementation is case-sensitive");
										assert.isNotEmpty(datastoreDifferencesArray, "datastore implementation is case-sensitive");
										resolve();
									} catch (error) {
										reject(error)
									}
								},
								(error) => {
									reject(error)
								}
							)
						},
					)
				},
				'"out" node is case-sensitive'() {
					//this.skip();
					const uppercaseQueryString = 'out(eyeColor,(BROWN,green))',
						lowercaseQueryString = 'out(eyeColor,(brown,green))';

					return new Promise((resolve, reject) => {
							const jsArrayDifferencesArray = getDifferenceBetweenTwoQueryResultsInMemoryStore(uppercaseQueryString, lowercaseQueryString);
							asyncGetDifferenceBetweenTwoQueryResultsInRestStore(uppercaseQueryString, lowercaseQueryString).then((datastoreDifferencesArray) => {
									try {
										assert.isNotEmpty(jsArrayDifferencesArray, "jsArray implementation is case-sensitive");
										assert.isNotEmpty(datastoreDifferencesArray, "datastore implementation is case-sensitive");
										resolve();
									} catch (error) {
										reject(error)
									}
								},
								(error) => {
									reject(error)
								}
							)
						},
					)
				},

			},
			'aggregate functions compatability': {

				'"select" node is compatible'() {
					//this.skip();
					const selectQueryString = 'select(id,firstName,phone)';
					return checkQueryResultsEquality(selectQueryString);
				},

				'"min" node is compatible'() {
					//this.skip();
					const queryString = 'select(min(age))';
					return checkQueryResultsEquality(queryString);
				},
				'"max" node is compatible'() {
					//this.skip();
					const queryString = 'select(max(age))';
					return checkQueryResultsEquality(queryString);
				},
				'"count" node is compatible'() {
					//this.skip();
					const queryString = 'select(count(age))';
					return checkQueryResultsEquality(queryString);
				},
				'"avg" node is compatible'() {
					//this.skip();
					const queryString = 'select(avg(age))';
					return checkQueryResultsEquality(queryString);
				},
				'"sum" node is compatible'() {
					//this.skip();
					const queryString = 'select(sum(age))';
					return checkQueryResultsEquality(queryString);
				},

			}
		}
	});
});