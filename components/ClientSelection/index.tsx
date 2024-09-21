import { FlatList, StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { SearchBar, Text } from "@rneui/base";
import useGetClients from "@/lib/hooks/useGetClients";
import { Button } from "react-native-ui-lib";
import { Stack } from "expo-router";
import NewClientModal from "@/components/ClientSelection/NewClientModal";
import Colors from "@/constants/Colors";
import Client from "@/types/Client";
import Item from "@/components/ClientSelection/Item";
import useSaveNewClient from "@/lib/hooks/useSaveNewClient";

type Props = {
  onBack: () => void;
  onNext: () => void;
  selectedClientId: number | undefined;
  onSelectClient: (client?: Client) => void;
};

const ClientSelection = ({ onBack, onNext, selectedClientId, onSelectClient }: Props) => {
  const { isLoading, clients } = useGetClients();
  const [searchedName, setSearchedName] = useState<string>("");
  const [filteredClients, setFilteredClients] = useState<Client[]>([]);
  const [showModal, setShowModal] = useState(false);
  const { saveNewClient } = useSaveNewClient();

  const onSaveClient = async (selectedClientData: {
    business_name: string;
    email: string;
    abn: string;
    address: string;
  }) => {
    const { newClient } = await saveNewClient(selectedClientData);

    if (newClient) {
      onSelectClient(newClient);
      setShowModal(false);
      onNext();
    }
  };

  const onSelect = (id: number) => {
    if (selectedClientId === id) {
      onSelectClient(undefined);
    } else {
      onSelectClient(clients?.find((client) => client.id === id));
    }
  };

  const onSearch = (searchedName: string) => {
    const filteredClients = clients.filter((client) =>
      client.business_name.toLowerCase().includes(searchedName.toLowerCase().trim())
    );
    setSearchedName(searchedName);
    setFilteredClients(filteredClients);
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: true,
          title: "Select client",
          headerTitleAlign: "center",
          headerTitle: () => <Text style={styles.headerTitle}>Select client</Text>,
          headerRight: () => (
            <Text style={styles.addText} onPress={() => setShowModal(true)}>
              + Add
            </Text>
          )
        }}
      />

      <SearchBar
        containerStyle={styles.searchBarContainer}
        inputContainerStyle={styles.searchBarInputContainer}
        value={searchedName}
        onChangeText={onSearch}
      />
      {isLoading ? (
        // improve this
        <Text>Loading...</Text>
      ) : (
        <FlatList
          style={styles.list}
          data={searchedName.length > 0 ? filteredClients : clients}
          renderItem={({ item }) => <Item selectedId={selectedClientId} onSelect={onSelect} {...item} />}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
      <View style={styles.buttons}>
        <Button style={styles.button} enableShadow round label={"<"} onPress={onBack} />
        <Button style={styles.button} disabled={!selectedClientId} enableShadow round label={">"} onPress={onNext} />
      </View>

      <NewClientModal isVisible={showModal} onClose={() => setShowModal(false)} onSaveClient={onSaveClient} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 20,
    height: "100%"
  },
  headerTitle: {
    fontWeight: "bold",
    fontSize: 20
  },
  addText: {
    fontSize: 20,
    color: Colors.light.blue30
  },
  searchBarContainer: {
    borderRadius: 30
  },
  searchBarInputContainer: {
    borderRadius: 30
  },
  list: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
    marginTop: 20,
    height: "100%",
    width: "100%"
  },
  buttons: {
    position: "absolute",
    bottom: 60,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 20
  },
  button: {
    gap: 20
  }
});

export default ClientSelection;
