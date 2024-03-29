import styled from "styled-components"
import { PersonOutline, CreditCard, Store, SettingsApplications, Dashboard, Category } from "@mui/icons-material"
import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom";

const Container = styled.div`
    flex: 1;
    height: calc(100vh - 60px);
    max-width: 250px;
    position: sticky;
    top: 60px;
    background-color: white;
    z-index: 4;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: 0 2px 2px -2px rgba(0,0,0,.2);
`

const SidebarWrapper = styled.div`
    padding: 20px 20px 20px 0px;
    color: #555;
`

const SidebarMenu = styled.div`
    margin-bottom: 10px;
`

const SidebarTitle = styled.h3`
    font-size: 10px;
    font-weight: bold;
    color: #999;
    margin: 15px 0px 10px 0px;
`

const SidebarList = styled.ul`
    list-style: none;
    display: flex;
    flex-direction: column;
    justify-content: center;

`

const Icon = styled.div`
    margin-right: 10px;
    color: #0171b6;
    font-size: 14px !important;
`

const SidebarListItem = styled.li`
    padding: 5px 10px;
    cursor: pointer;
    display: flex;
    font-size: 14px;
    align-items: center;
    color: #0171b6;


    &:hover {
        background-color: #e2f5ff;
        color: #333333;
    }
`

const SidebarListItemSelected = styled.li`
    padding: 5px 10px;
    cursor: pointer;
    display: flex;
    font-size: 14px;
    align-items: center;
    color: #ffffff !important;
    background-color: #0171b6;

    ${Icon} {
       color: white; 
    }
`

const Wrapper = styled.div`

`



const Sidebar = () => {
    const location = useLocation();
    const [selected, setSelected] = useState(location.pathname);
    const navigate = useNavigate();

    useEffect(() => {
        setSelected(location.pathname)
    }, [location.pathname]);


    const data = [
        {
            title: "MAIN",
            options: [{
                name: "Dashboard",
                icon: (<Dashboard className="iconMUI" />),
                goto: "/admin/dashboard"
            }],
        },
        {
            title: "CONTROLS",
            options: [{
                name: "Users",
                icon: (<PersonOutline className="iconMUI" />),
                goto: "/admin/users"
            }],
        },
        {
            title: "INVENTORY",
            options: [{
                name: "Products",
                icon: (<Store className="iconMUI" />),
                goto: "/admin/products"
            }, {
                name: "Categories",
                icon: (<Category className="iconMUI" />),
                goto: "/admin/categories"
            }],
        },
        {
            title: "SERVICES",
            options: [{
                name: "Orders",
                icon: (<CreditCard className="iconMUI" />),
                goto: "/admin/orders"
            }]
        },
        {
            title: "USER",
            options: [
            {
                name: "Settings",
                icon: (<SettingsApplications className="iconMUI" />),
                goto: "/admin/settings"
            }],
        },
    ]


    return (
        <Container>
            <SidebarWrapper>

                <SidebarList>
                    {data.map((menu) => (
                        <SidebarMenu key={menu.title}>
                            <SidebarTitle > {menu.title} </SidebarTitle>
                            {menu.options.map((child) => (
                                <Wrapper key={child.name} onClick={() => {
                                    setSelected(child.goto)
                                    navigate(child.goto)
                                }}>
                                    {child.goto !== selected ?
                                        <SidebarListItem >
                                            <Icon>
                                                {child.icon}
                                            </Icon>
                                            {child.name}
                                        </SidebarListItem>
                                        :
                                        <SidebarListItemSelected  >
                                            <Icon>
                                                {child.icon}
                                            </Icon>
                                            {child.name}
                                        </SidebarListItemSelected>
                                    }
                                </Wrapper>

                            ))}
                        </SidebarMenu>
                    ))}
                </SidebarList>
            </SidebarWrapper>
        </Container>
    )
}

export default Sidebar