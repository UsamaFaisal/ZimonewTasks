import React, { useState, useEffect } from 'react';
import { PermissionsAndroid ,StyleSheet, Text, View, FlatList, TouchableOpacity,Image } from 'react-native';
import Contacts from 'react-native-contacts';
import Header from '../components/Header';

export default function ContactList({ navigation }: { navigation: any }) {
  const [contactList, setContactList] = useState<Contacts.Contact[]>([]);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
          {
            title: 'Contacts',
            message: 'This app would like to view your contacts.',
            buttonPositive: 'Please accept bare mortal',
          }
        );

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          const contacts = await Contacts.getAll();
          setContactList(contacts);
          console.log(contacts);
        } else {
          console.log('Contacts permission denied');
        }
      } catch (error) {
        console.error('Error fetching contacts:', error);
      }
    };

    fetchContacts();
  }, []);

  const sortedContacts = contactList.slice().sort((a, b) => (a.displayName ?? '').localeCompare(b.displayName ?? ''));

  const renderItem = ({ item }: { item: Contacts.Contact }) => (
    <View style={styles.contactItem}>
      <Text style={styles.contactPhoneNumber}>
        {item.displayName ?? 'Unknown Contact'} {item.phoneNumbers ? item.phoneNumbers[0]?.number : ''}
      </Text>
      <TouchableOpacity>
      <Text style={{color:'brown'}}>invite</Text>
      </TouchableOpacity>
    </View>
  
  );

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.fll}>
      <View style={styles.footer}>
        <Text style={styles.contactCount}>{contactList.length} Contacts</Text>
      </View>
      <View>
        <Text style={styles.headerTitle}>Contacts</Text>     
      </View>
      <View>    
        <Image source={require('../assets/zimo3.png')} style={styles.iconImage2} />
      </View>
      </View>

      <View style={styles.footer1}>
         <Image source={require('../assets/user.png')} style={styles.iconImage1} />
         <Text style={styles.headerTitle1}>Usama Faisal</Text>
      <TouchableOpacity>
        <Image source={require('../assets/plus.png')} style={styles.iconImage} />
      </TouchableOpacity>    
      </View>
      <FlatList
        data={sortedContacts}
        renderItem={renderItem}
        keyExtractor={(item) => item.recordID}
      />
      <View style={styles.footr}>
        <TouchableOpacity>
           <Image source={require('../assets/search.png')} style={styles.iconImage} />
        </TouchableOpacity>
        <TouchableOpacity>
           <Image source={require('../assets/filtr.png')} style={styles.iconImage} />
        </TouchableOpacity>
        <TouchableOpacity>
           <Image source={require('../assets/heart.png')} style={styles.iconImage} />
        </TouchableOpacity>
        <TouchableOpacity>
           <Image source={require('../assets/usr.png')} style={styles.iconImage} />
        </TouchableOpacity>
      </View>
      
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  spacing: {
    // justifyContent: 'space-between',
  },
  footr:{
   flexDirection:'row',
   justifyContent:'space-around',
   marginBottom:5,
   borderWidth:1,
   padding:5,
   borderColor:'blue',
   zIndex:1,
  },
  fll:{
    flexDirection:'row',
    justifyContent:'space-around',
    alignItems:'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  iconImage: {
    width: 34,
    height: 34,
  },
  iconImage2: {
    width: 34,
    height: 34,
    paddingRight:20,
    // alignSelf:'flex-end',
  },
  iconImage1: {
    width: 60,
    height: 60,
    paddingLeft:80,
  },
  backButton: {
    paddingRight: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    // position:'absolute',
    paddingRight:60,
    alignSelf:'center',
  },
  headerTitle1: {
    fontSize: 18,
    fontWeight: 'bold',
    alignContent:'center',
    paddingRight:80,
    justifyContent:'center',
  },
  contactItem: {
    flexDirection:'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    padding: 15,
    justifyContent: 'space-between',
  },
  contactName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  contactPhoneNumber: {
    // marginLeft:9,
    // paddingLeft:10,
    fontSize: 16,
    color: '#888',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    // borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  footer1: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    // alignContent:'center',
    alignItems:'center',
    // padding: 10,
    // borderTopWidth: 1,
    // paddingTop:40,
    borderTopColor: '#ccc',
  },
  contactCount: {
    color: '#888',
    alignSelf:'flex-start',
  },
  addContactButton: {
    color: 'blue',
    fontWeight: 'bold',
  },
});
