import { useEffect, useState} from "react";
import Service from "../utils/http";
import { Title } from "@mantine/core";

const Profile = () => {

    const [data, setData] = useState(null);

    const service = new Service();

    const getData = async () => {
        const response = await service.get('user/me');
        console.log(response);
        setData(response);
    }

    useEffect(() => {
        getData();
    }, []);

  return (
    <Title>
        {data?.name}
    </Title>
  )
}

export default Profile;