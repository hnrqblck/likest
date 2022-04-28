import React from "react";
import {
    Box,
    Tabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel,
    Flex,
} from "@chakra-ui/react"
import Certificate from "./Certificate";
import Loader from "./Loader";
// import LinkedIn from "./LinkedIn";
import Stats from "./Stats";
import { TabIndexContext } from "./Context/TabIndexContext";
import { i18n } from "../translate/i18n";


const ContentTabs = (props) => {
    // const [tabIndex, setTabIndex] = React.useState(0);
    const tabIndex = React.useContext(TabIndexContext);

  return (
    <>
                <Flex height="fit-content">
                    <Tabs index={tabIndex.tabInd} isFitted size="sm" width="63.5vw" colorScheme="blue">

                        {props.fetching_st_data ?
                            (<>
                                <TabList>
                                    <Tab isDisabled>{i18n.t('contentTabs.cert')}</Tab>
                                    <Tab isDisabled>{i18n.t('contentTabs.stats')}</Tab>
                                </TabList>
                                <TabPanels>
                                    <TabPanel>
                                        <Box paddingTop="1vh">
                                            <Loader fetching_state={props.fetching_state}></Loader>
                                        </Box>
                                    </TabPanel>
                                    <TabPanel>
                                    </TabPanel>
                                </TabPanels>
                            </>
                            ) : (
                                <>
                                    <TabList>
                                        <Tab onClick={() => tabIndex.handleTabIndex(0)}>
                                        {i18n.t('contentTabs.cert')}
                                        </Tab>
                                        <Tab onClick={() => tabIndex.handleTabIndex(1)}>{i18n.t('contentTabs.stats')}</Tab>
                                    </TabList>
                                    <TabPanels paddingTop="1vh">
                                        <TabPanel>
                                            <Box >
                                                <Certificate
                                                    cert_level_participante={props.cert_level_participante}
                                                    cert_level_mentor={props.cert_level_mentor}
                                                    issue_date={props.issue_date}
                                                    cert_type={props.cert_type}
                                                />
                                            </Box>
                                        </TabPanel>
                                        <TabPanel>
                                            <Stats
                                                cert_level_participante={props.cert_level_participante}
                                                cert_level_mentor={props.cert_level_mentor}
                                                cert_type={props.cert_type}
                                                has_mentorship={props.has_mentorship}
                                                issue_date={props.issue_date}
                                                number_of_projects={props.number_of_projects}
                                                number_of_missions={props.number_of_missions}
                                                number_of_divergence_points={props.number_of_divergence_points}
                                                number_of_convergence_points={props.number_of_convergence_points}
                                                number_of_conversation_points={props.number_of_conversation_points}
                                                number_of_replies_from_user={props.number_of_replies_from_user}
                                                number_of_comment_replies_from_user={props.number_of_comment_replies_from_user}
                                                number_of_mentorships={props.number_of_mentorships}
                                            />
                                        </TabPanel>
                                    </TabPanels>
                                </>
                            )}
                    </Tabs>
                </Flex>
            </>
  )
}

export default ContentTabs;