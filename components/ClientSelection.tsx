import { FlatList, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import { SearchBar, Text } from "@rneui/base";
import useGetClients from "@/hooks/useGetClients";
import { Button, Checkbox, Chip, ListItem } from "react-native-ui-lib";
import { Stack } from "expo-router";
import NewClientModal from "@/components/NewClientModal";
import Colors from "@/constants/Colors";
import { supabase } from "@/lib/supabase";

const ClientSelection = ({ goBack, goNext }: { goBack: () => void; goNext: () => void }) => {
  const [searchBusiness, setSearchBusiness] = useState<string>("");
  const [selectedClient, setSelectedClient] = useState<string>("");
  const [filteredClients, setFilteredClients] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const { loading, clients } = useGetClients();

  const onSaveClient = async (selectedClientData: { name: string; email: string; abn: string; address: string }) => {
    try {
      //todo: extract into service
      const { error } = await supabase.from("clients").insert({
        business_name: selectedClientData.name,
        email: selectedClientData.email,
        abn: selectedClientData.abn,
        address: selectedClientData.address
      });

      //TODO: do this also on select
      const { data } = await supabase.from("clients").select("id").eq("email", selectedClientData.email);
      console.log(data?.[0].id);
      if (error) throw error;
      //TODO: should select id of new client and go next
      setShowModal(false);
      // goNext();
    } catch (error) {
      console.log(error);
    }
  };

  const onSelect = (id: string) => {
    if (selectedClient === id) {
      setSelectedClient("");
    } else {
      setSelectedClient(id);
    }
  };

  useEffect(() => {
    setFilteredClients(
      clients.filter((clients) => clients.business_name.toLowerCase().includes(searchBusiness.toLowerCase()))
    );

    if (searchBusiness.length === 0) {
      setFilteredClients(clients);
    }
  }, [searchBusiness, clients]);

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: true,
          title: "Select client",
          headerTitleAlign: "center",
          headerTitle: (props) => <Text style={{ fontWeight: "bold", fontSize: 20 }}>Select client</Text>,
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
        value={searchBusiness}
        onChangeText={(value) => setSearchBusiness(value)}
      />
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <FlatList
          style={styles.list}
          data={filteredClients}
          renderItem={({ item }) => (
            <Item style={styles.itemList} selectedId={selectedClient} onSelect={onSelect} {...item} />
          )}
          keyExtractor={(item) => item.id}
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

const Item = ({
  id,
  email,
  address,
  business_name,
  signer_names,
  selectedId,
  onSelect
}: {
  id: string;
  email: string;
  address: string;
  business_name: string;
  signer_names: string[] | null;
  selectedId: string;
  onSelect: (id: string) => void;
}) => {
  return (
    <ListItem
      onPress={() => onSelect(id)}
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingTop: 20
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "column"
        }}
      >
        <Text style={{ fontWeight: "bold" }}>{business_name}</Text>
        <Text>{email}</Text>
        <Text>{address} </Text>
        <View>
          {signer_names &&
            signer_names.length &&
            signer_names.map((signer) => (
              <Chip containerStyle={{ width: "20%", marginTop: 5 }} key={signer} label={signer} />
            ))}
        </View>
      </View>
      <Checkbox value={selectedId === id} onValueChange={() => onSelect(id)} />
    </ListItem>
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
  itemList: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 20,
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
