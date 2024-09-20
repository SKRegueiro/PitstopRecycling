import { FlatList, StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { SearchBar, Text } from "@rneui/base";
import useGetClients from "@/lib/hooks/useGetClients";
import { Button } from "react-native-ui-lib";
import { Stack } from "expo-router";
import NewClientModal from "@/components/ClientSelection/NewClientModal";
import Colors from "@/constants/Colors";
import selectClientsColumnBy from "@/services/clients/selectColumnBy";
import insertNewClient from "@/services/clients/insertNewClient";
import Client from "@/types/Client";
import Item from "@/components/ClientSelection/Item";

const ClientSelection = ({
  goBack,
  goNext,
  selectedClient,
  onSelectClient
}: {
  goBack: () => void;
  goNext: () => void;
  selectedClient: number | undefined;
  onSelectClient: (clientId?: number) => void;
}) => {
  const { isLoading, clients } = useGetClients();
  const [searchedName, setSearchedName] = useState<string>("");
  const [filteredClients, setFilteredClients] = useState<Client[]>([]);
  const [showModal, setShowModal] = useState(false);

  //todo: extract functionality to parent component
  const onSaveClient = async (selectedClientData: { name: string; email: string; abn: string; address: string }) => {
    try {
      const { error } = await insertNewClient({
        business_name: selectedClientData.name,
        email: selectedClientData.email,
        abn: selectedClientData.abn,
        address: selectedClientData.address
      });

      const { data } = await selectClientsColumnBy({
        by: "business_name",
        value: selectedClientData.name,
        column: "id"
      });

      if (error) throw error;
      onSelectClient(data?.[0].id!);
      setShowModal(false);
      goNext();
    } catch (error) {
      console.log(error);
    }
  };

  const onSelect = (id: number) => {
    if (selectedClient === id) {
      onSelectClient(undefined);
    } else {
      onSelectClient(id);
    }
  };

  const onSearch = (searchedName: string) => {
    setSearchedName(searchedName);
    setFilteredClients(
      clients.filter((clients) => clients.business_name.toLowerCase().includes(searchedName.toLowerCase().trim()))
    );

    if (searchedName.length === 0) {
      setFilteredClients(clients);
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: true,
          title: "Select client",
          headerTitleAlign: "center",
          headerTitle: () => <Text style={{ fontWeight: "bold", fontSize: 20 }}>Select client</Text>,
          headerRight: () => (
            <Text style={{ fontSize: 20, color: Colors.light.blue30 }} onPress={() => setShowModal(true)}>
              + Add
            </Text>
          )
        }}
      />

      <SearchBar
        containerStyle={{ borderRadius: 30 }}
        inputContainerStyle={{ borderRadius: 30 }}
        value={searchedName}
        onChangeText={onSearch}
      />
      {isLoading ? (
        <Text>Loading...</Text>
      ) : (
        <FlatList
          style={styles.list}
          data={searchedName.length > 0 ? filteredClients : clients}
          renderItem={({ item }) => <Item selectedId={selectedClient} onSelect={onSelect} {...item} />}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
      <View style={styles.buttons}>
        <Button style={styles.button} enableShadow round label={"<"} onPress={() => goBack()} />
        <Button
          style={styles.button}
          disabled={!selectedClient}
          enableShadow
          round
          label={">"}
          onPress={() => goNext()}
        />
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
  button: {
    gap: 20
  },
  list: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
    marginTop: 20,
    height: "100%",
    width: "100%"
  },
  input: {
    display: "flex",
    height: 50,
    alignItems: "center",
    marginTop: 40,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    gap: 20
  },
  buttons: {
    position: "absolute",
    bottom: 60,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 20
  }
});

export default ClientSelection;
