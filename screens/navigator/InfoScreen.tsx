import * as React from 'react';
import { Image, Linking, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, View } from '../../components/Themed';
import Colors from '../../constants/Colors';
import { ReturnButton } from '../../components/Display';
import { RootStackScreenProps } from '../../types';


export default function InfoScreen({ navigation }: RootStackScreenProps<'Info'>) {
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.container}>
          <View style={{ alignItems: 'center', }}>
            <Image source={require('../../assets/images/logoVide.png')} style={styles.image} />
            <Text style={styles.title}>La Popoterie</Text>
            <Text style={styles.subTitle}>Application de recettes de cuisine</Text>

            <View style={styles.separator} />

            <Text style={styles.subTitle2}>Version 1.0</Text>
            <View style={styles.separator} />

          </View>

          <View style={styles.container2}>
            <View style={styles.separator} />
            <Text style={styles.title2}>A propos</Text>
            <View style={styles.separator} />
            <Text style={styles.texte}>
              La question écologique est la préoccupation majeure de ce projet.
              En effet les choix que nous faisons en matière d'alimentation ont un impact significatif sur l'environnement.
              La production alimentaire industrielle contribue à la déforestation, à la pollution de l'air et de l'eau, à l'épuisement des ressources naturelles et à l'émission de gaz à effet de serre.
              En privilégiant une alimentation plus durable, telle que l'achat de produits locaux, biologiques et de saison, la réduction de la consommation de viande et le soutien à l'agriculture durable,
              nous pouvons contribuer à la préservation de la biodiversité, à la lutte contre le changement climatique et à la protection des écosystèmes fragiles.
            </Text>
            <View style={styles.separator} />
            <Text style={styles.texte}>
              Il est donc crucial de faire attention à son alimentation dans une perspective écologique, même en tant qu'étudiant.
              De plus, de nos jours, de nombreux étudiants sont confrontés à des
              difficultés financières. Dans ces circonstances, il devient primordial
              de trouver des solutions pour réduire les dépenses, y compris celles liées à l'alimentation.
              L'application "La Popoterie" se positionne comme un outil précieux pour les étudiants dans ce contexte.
              Elle propose des recettes végétariennes et végétaliennes abordables, en mettant en avant des produits locaux et
              de saison afin de soutenir les étudiants dans leurs efforts pour concilier leur budget et leur
              impact sur l'environnement.
            </Text>
            <View style={styles.separator} />
            <Text style={styles.texte2}>
              "Chaque petit geste compte, et ensemble,
              nous pouvons faire une différence significative."
            </Text>
            <View style={styles.separator} />

            <Text style={styles.title2}>Aide</Text>
            <View style={styles.separator} />
            <Text style={styles.texte3}>
              Le symbole «🌱» signifie que la recette convient à un régime végétalien. {"\n"}
              Le symbole «🥛» signifie que la recette convient à un régime sans lactose.{"\n"}
              Le symbole «🌾» signifie que la recette convient à un régime sans gluten.{"\n"}
              Par défaut toutes nos recettes conviennent au régime végétarien "🥗".{"\n"}
              {"\n"}
              Le symbole «🌷» signifie que la recette contient des ingrédients dont il est préférable de consommer au printemps.{"\n"}
              Le symbole «☀️» signifie que la recette contient des ingrédients dont il est préférable de consommer en été.{"\n"}
              Le symbole «🍂» signifie que la recette contient des ingrédients dont il est préférable de consommer en automne.{"\n"}
              Le symbole «❄️» signifie que la recette contient des ingrédients dont il est préférable de consommer en hiver.{"\n"}

              {"\n"}
              Le budget 💸 proposé pour chaque recette peut ne pas être exact et varier en fonction des enseignes et des saisons.
              Pour le calculer, nous avons fait la moyenne des prix proposés dans plusieurs enseignes françaises.
            </Text>
            <View style={styles.separator} />
            <Text style={styles.title2}>Nous contacter</Text>
            <View style={styles.separator} />
            <Text style={styles.texte3}>
              Vous avez des questions, des suggestions ou vous voulez juste discuter?{"\n"}
              N’hésitez pas à nous contacter à l’adresse suivante: {'\n'}</Text>
            <View style={{ flexDirection: 'row', backgroundColor: 'transparent' }}>
              <Text style={styles.texte3}>Mail:</Text>
              <TouchableOpacity onPress={() => Linking.openURL('mailto: application.la.popoterie@gmail.com')}>
                <Text style={styles.texte4}>application.la.popoterie@gmail.com</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.texte3}> {'\n'}Ou sur nos réseaux: {'\n'}</Text>


            <View style={{ flexDirection: 'row', backgroundColor: 'transparent' }}>
              <Text style={styles.texte3}>Insta:</Text>
              <TouchableOpacity onPress={() => Linking.openURL('https://www.instagram.com/la.popoterie/')}>
                <Text style={styles.texte4}>@la.popoterie</Text>
              </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row', backgroundColor: 'transparent' }}>
              <Text style={styles.texte3}>TikTok:</Text>
              <TouchableOpacity onPress={() => Linking.openURL('https://www.tiktok.com/@lapopoterie?lang=fr')}>
                <Text style={styles.texte4}>@lapopoterie</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.separator} />

            <Text style={styles.subTitle3}> Fondée par: </Text>
            <Text style={styles.subTitle3}>Cassandre BELLENGUEZ</Text>
            <View style={styles.separator} />
            <Text style={styles.subTitle3}>Développement de l'Application:</Text>
            <Text style={styles.subTitle3}> Arthur GARON</Text>
            <View style={styles.separator} />
            <Text style={styles.subTitle3}>Conception du graphisme:</Text>
            <Text style={styles.subTitle3}>Maxence BELLENGUEZ</Text>
            <View style={styles.separator} />
          </View>
        </View>



      </ScrollView>
      <ReturnButton navigation={navigation} />
    </View>


  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  container2: {
    flex: 1,
    backgroundColor: Colors.lightGreen,
    borderRadius: 20,
    margin: 20,
  },
  title: {
    fontSize: 50,
    fontFamily: 'Butler',
    color: Colors.darkGreen,
    marginTop: -30,
  },
  imageInsta: {
    width: 50,
    height: 50,
    marginHorizontal: 10,
  },
  imageTiktok: {
    width: 50,
    height: 50,
    marginHorizontal: 10,
  },
  title2: {
    fontSize: 30,
    fontFamily: 'Loves',
    alignItems: 'center',
    textAlign: 'center',
  },
  image: {
    width: 350,
    height: 350,
  },
  subTitle: {
    fontSize: 25,
    fontFamily: 'Butler',
    color: Colors.intanceDarkGreen,
    alignItems: 'center',
    textAlign: 'center',
    paddingHorizontal: 10,
  },
  subTitle2: {
    fontSize: 25,

    fontFamily: 'Cabin',
    color: Colors.darkGreen,
    alignItems: 'center',
    textAlign: 'center',
    paddingHorizontal: 10,
  },
  subTitle3: {
    fontSize: 15,
    fontFamily: 'Cabin',
    color: Colors.darkGreen,
    alignItems: 'center',
    textAlign: 'center',
    paddingHorizontal: 10,
  },
  separator: {
    marginVertical: 20,
    height: 2,
    alignSelf: 'center',
  },
  texte: {
    fontSize: 16,
    fontFamily: 'Cabin',
    color: 'black',
    alignItems: 'center',
    marginLeft: 20,
    marginRight: 20,
  },
  texte2: {
    fontSize: 18,
    fontFamily: 'Butler',
    color: 'black',
    textAlign: 'center',
    marginLeft: 20,
    marginRight: 20,
  },
  texte3: {
    fontSize: 16,
    fontFamily: 'Cabin',
    color: 'black',
    marginHorizontal: 20,
  },
  texte4: {
    fontSize: 16,
    fontFamily: 'Cabin',
    color: 'blue',
    marginHorizontal: 0,
  },
});

