// Importer les limites administratives du Sénégal depuis la collection GEE
var senegal = ee.FeatureCollection('FAO/GAUL_SIMPLIFIED_500m/2015/level0')
  .filter(ee.Filter.eq('ADM0_NAME', 'Senegal'));

// Centrer la carte sur le Sénégal
Map.centerObject(senegal, 6);
Map.addLayer(senegal, {color: 'blue'}, 'Sénégal');


// Charger la collection Sentinel-2 Surface Reflectance pour l'année 2023
var sentinelCollection = ee.ImageCollection('COPERNICUS/S2_SR')
  .filterBounds(senegal) // Filtrer par la zone d'intérêt (Sénégal)
  .filterDate('2023-01-01', '2023-12-31') // Filtrer par date (année 2023)
  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 10)); // Filtrer les images avec moins de 20% de nuages

// Calculer l'image médiane (réduction sur la collection)
var medianImage = sentinelCollection.median();
var visParams = {
  bands: ['B4', 'B3', 'B2'], // Rouge, Vert, Bleu
  min: 0, max: 3000
};
Map.addLayer(medianImage.clip(senegal), visParams, 'Sentinel-2 Sénégal (RGB)');


// Echantillons pour les zones urbaines
var urban = ee.FeatureCollection([
  ee.Feature(ee.Geometry.Point([-17.46075961234284, 14.739923912137346]), {'class': 0}), // Zone urbaine à Dakar
  ee.Feature(ee.Geometry.Point([-17.29453280902133, 14.770060059549582 ]), {'class': 0}),
  ee.Feature(ee.Geometry.Point([-16.924956487514674, 14.795519254567155]), {'class': 0}), 
  ee.Feature(ee.Geometry.Point([-13.256408, 15.659608 ]), {'class': 0}), 
  ee.Feature(ee.Geometry.Point([-16.086582, 14.154238 ]), {'class': 0}), 
  ee.Feature(ee.Geometry.Point([-15.875955, 14.864565 ]), {'class': 0}), 
  ee.Feature(ee.Geometry.Point([-11.876965, 13.431156 ]), {'class':0}),
  ee.Feature(ee.Geometry.Point([-16.434963, 12.915149 ]), {'class': 0}),
  ee.Feature(ee.Geometry.Point([-16.490072, 16.010256]), {'class': 0}),
  ee.Feature(ee.Geometry.Point([-16.267436, 15.918616]), {'class': 0}),
  ee.Feature(ee.Geometry.Point([-14.015171, 16.193493]), {'class': 0}),
  ee.Feature(ee.Geometry.Point([-13.673476, 13.768048]), {'class': 0}),
  ee.Feature(ee.Geometry.Point([-13.7518902, 13.1477171]), {'class': 0}),
  // Ajouter d'autres points pour représenter d'autres zones urbaines
  // [-16.924956487514674, 14.795519254567155], [-13.256408, 15.659608], [-13.668104, 13.771601], [-16.269273, 12.580116], 
  //[-12.181995, 12.560149], [-16.086582, 14.154238], [-15.875955, 14.864565])
]);

// Echantillons pour les zones de végétation
var vegetation = ee.FeatureCollection([
  ee.Feature(ee.Geometry.Point([-16.57466, 13.93015]), {'class': 1}), // Végétation
  ee.Feature(ee.Geometry.Point([-16.43314, 12.78687]), {'class': 1}),
  ee.Feature(ee.Geometry.Point([-16.20221, 16.44627]), {'class': 1}),
  ee.Feature(ee.Geometry.Point([-15.69131, 16.38908]), {'class': 1}),
  ee.Feature(ee.Geometry.Point([-15.75879, 16.42841]), {'class': 1}),
  ee.Feature(ee.Geometry.Point([-11.97801, 13.445553]), {'class': 1}),
  // Ajouter d'autres points [-16.20221, 16.44627], [-15.69131, 16.38908], [-15.75879, 16.42841], [-14.25554, 16.38982],
  //[-13.258939, 15.729499], [-15.805518, 16.180529], [-15.881407, 16.267647], [-15.926844, 16.271484])
]);

// Echantillons pour l'eau
var water = ee.FeatureCollection([
  ee.Feature(ee.Geometry.Point([-15.91147, 16.09755]), {'class': 2}), // Eau (fleuve ou océan)
  ee.Feature(ee.Geometry.Point([-16.45269, 16.15859]), {'class': 2}),
  ee.Feature(ee.Geometry.Point([-12.935594, 15.347947]), {'class': 2}),
  ee.Feature(ee.Geometry.Point([-12.249485, 14.767638]), {'class': 2}),
  ee.Feature(ee.Geometry.Point([-16.50868, 14.10061]), {'class': 2}),
  ee.Feature(ee.Geometry.Point([-16.21526, 16.43925]), {'class': 2}),
  ee.Feature(ee.Geometry.Point([-15.69816, 12.99047]), {'class': 2}),
  // Ajouter d'autres points
  //[-12.935594, 15.347947], [-12.249485, 14.767638], [-16.50868, 14.10061], [-16.05898, 14.11243],
  //[-17.416842, 14.750774], [-17.443265, 14.73352], [-16.21526, 16.43925]), 
]);

// Echantillons pour le sol nu
var bareSoil = ee.FeatureCollection([
  ee.Feature(ee.Geometry.Point([-15.923797, 16.271886]), {'class': 3}), // Sol nu
  ee.Feature(ee.Geometry.Point([-16.402005, 14.656676]), {'class': 3}),
  ee.Feature(ee.Geometry.Point([-14.90584, 13.441184]), {'class': 3}),
  ee.Feature(ee.Geometry.Point([-16.43899, 14.229597]), {'class': 3}),
  ee.Feature(ee.Geometry.Point([-14.90584, 13.441184]), {'class': 3}),
  ee.Feature(ee.Geometry.Point([-17.4090278, 14.7737637]), {'class': 3}),
  ee.Feature(ee.Geometry.Point([-12.267018, 13.448901]), {'class': 3}),
  ee.Feature(ee.Geometry.Point([-14.55412, 15.67181 ]), {'class': 3}),
  ee.Feature(ee.Geometry.Point([-14.777034, 13.42077]), {'class': 3}),
  // Ajouter d'autres points
  //[-16.402005, 14.656676], [-16.9445933, 14.7649669], [-17.3742922, 14.7589542], 
  //[-17.4090278, 14.7737637], [-16.43899, 14.229597], [-14.90584, 13.441184]),
]);

// Combiner toutes les classes
var trainingData = urban.merge(vegetation).merge(water).merge(bareSoil);

// Préparer les données d'entraînement
var training = medianImage.sampleRegions({
  collection: trainingData,
  properties: ['class'],
  scale: 10
});

// Entraîner un classificateur RandomForest
var classifier = ee.Classifier.smileRandomForest(10).train({
  features: training,
  classProperty: 'class',
  inputProperties: ['B2', 'B3', 'B4', 'B8'] // Bandes utilisées pour l'entraînement
});

// Appliquer le classificateur à l'image
var classified = medianImage.classify(classifier);

// Palette de couleurs pour la classification
var palette = ['red', 'green', 'blue', 'yellow']; // Urbain, végétation, eau, sol nu
Map.addLayer(classified.clip(senegal), {min: 0, max: 3, palette: palette}, 'Classification Sénégal');

// Exporter l'image classifiée vers Google Drive
Export.image.toDrive({
  image: classified.clip(senegal),
  description: 'Classification_Senegal_2023',
  scale: 10,
  region: senegal.geometry().bounds(), // On garde la région du Sénégal
  crs: 'EPSG:4326', // Projection WGS 84 (EPSG:4326)
  fileFormat: 'GeoTIFF'
});

// **Étape 1 : Diviser les données d'échantillonnage**
var withRandom = trainingData.randomColumn('random');

// 70% des données pour l'entraînement
var trainingSet = withRandom.filter(ee.Filter.lt('random', 0.7));

// 30% des données pour la validation
var validationSet = withRandom.filter(ee.Filter.gte('random', 0.7));

// **Étape 2 : Entraîner le modèle avec l'ensemble d'entraînement**
var training = medianImage.sampleRegions({
  collection: trainingSet,
  properties: ['class'],
  scale: 10
});

var classifier = ee.Classifier.smileRandomForest(10).train({
  features: training,
  classProperty: 'class',
  inputProperties: ['B2', 'B3', 'B4', 'B8'] 
});

// **Étape 3 : Appliquer le modèle aux données de validation**
var validation = medianImage.sampleRegions({
  collection: validationSet,
  properties: ['class'],
  scale: 10
});

var validated = validation.classify(classifier);

// **Étape 4 : Générer la matrice de confusion**
var confusionMatrix = validated.errorMatrix('class', 'classification');

// Afficher la matrice de confusion
print('Matrice de confusion :', confusionMatrix);

// Calculer la précision globale
var accuracy = confusionMatrix.accuracy();
print('Précision globale :', accuracy);

// Calculer d'autres statistiques comme le Kappa
var kappa = confusionMatrix.kappa();
print('Kappa :', kappa);

// Précision du producteur (par classe)
var producersAccuracy = confusionMatrix.producersAccuracy();
print('Précision du producteur (par classe) :', producersAccuracy);

// Précision du consommateur (par classe)
var consumersAccuracy = confusionMatrix.consumersAccuracy();
print('Précision du consommateur (par classe) :', consumersAccuracy);

// Ajouter les points d'échantillonnage à la carte
Map.addLayer(urban, {color: 'red'}, 'Echantillons Urbains');
Map.addLayer(vegetation, {color: 'green'}, 'Echantillons Végétation');
Map.addLayer(water, {color: 'blue'}, 'Echantillons Eau');
Map.addLayer(bareSoil, {color: 'yellow'}, 'Echantillons Sol Nu');

// Fonction pour ajouter une légende
function addLegend() {
  // Créer un panneau pour la légende
  var legend = ui.Panel({
    style: {
      position: 'bottom-left',
      padding: '8px 15px'
    }
  });

  // Titre de la légende
  var legendTitle = ui.Label({
    value: 'Légende',
    style: {fontWeight: 'bold', fontSize: '16px', margin: '0 0 4px 0'}
  });
  legend.add(legendTitle);

  // Ajouter les éléments de la légende
  var classes = [
    {label: 'Urbain', color: 'red'},
    {label: 'Végétation', color: 'green'},
    {label: 'Eau', color: 'blue'},
    {label: 'Sol Nu', color: 'yellow'}
  ];

  classes.forEach(function(classInfo) {
    var colorBox = ui.Label({
      style: {
        backgroundColor: classInfo.color,
        padding: '8px',
        margin: '0 0 4px 0'
      }
    });
    var description = ui.Label(classInfo.label);
    legend.add(ui.Panel([colorBox, description], ui.Panel.Layout.Flow('horizontal')));
  });

  // Ajouter le panneau de légende à la carte
  Map.add(legend);
}

// Appeler la fonction pour ajouter la légende
addLegend();
