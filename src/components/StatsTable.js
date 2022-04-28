import React from "react";

import reference_scores from './data/reference_scores.json';

import {
    ChakraProvider,
    Table,
    Thead,
    Tbody,
    TableCaption,
    Tr,
    Th,
    Td,
    Box,
    Heading,
    Text
} from "@chakra-ui/react"

import UserSession from '../components/UserSession';
import { i18n } from "../translate/i18n";

class StatsTable extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            next_level_data: {}
        };
        this.full_name = UserSession.getName()
        // this.next_level_data = [{}];
        this.getScoresFromCertTypes = this.getScoresFromCertTypes.bind(this)
    }

    getScoresFromCertTypes() {

        let next_level_data = [{}]

        if (this.props.cert_type === 'participante') {
            next_level_data = reference_scores.participante.filter(obj => {
                if (this.props.cert_level_participante < 3) {
                    return obj.level === this.props.cert_level_participante + 1
                } else {
                    return obj.level === this.props.cert_level_participante
                }
            })
        }

        if (this.props.cert_type === 'mentor') {
            next_level_data = reference_scores.mentor.filter(obj => {
                if (this.props.cert_level_mentor < 3) {
                    return obj.level === this.props.cert_level_mentor + 1
                } else {
                    return obj.level === this.props.cert_level_mentor
                }
            })
        }
        this.setState({ next_level_data: next_level_data[0] },
        )
    }

    componentDidMount() {
        this.getScoresFromCertTypes()
    }

    render() {
        return (
            <ChakraProvider>
                <Box>
                    <Heading size="lg">{this.full_name}</Heading>
                    <Text textAlign="left" marginTop="1em" marginBottom="1em">{i18n.t('statsTable.heading')} {this.props.issue_date.day}/{this.props.issue_date.month}/{this.props.issue_date.year}</Text>
                    <Box overflow="auto" maxHeight="45vh" paddingTop="2vh">
                        <Table variant="striped" size="sm" width="52vw" colorScheme="blue">
                            <Thead>
                                <Tr>
                                    <Th fontSize="x-small">{i18n.t('statsTable.tableHd1')}</Th>
                                    <Th fontSize="x-small" textAlign="right" >{i18n.t('statsTable.tableHd2')}</Th>
                                    <Th fontSize="x-small" textAlign="right">{i18n.t('statsTable.tableHd3')}</Th>
                                    <Th fontSize="x-small" textAlign="right">{i18n.t('statsTable.tableHd4')} {this.state.next_level_data.level}</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                <Tr>
                                    <Td>{i18n.t('statsTable.tableDt1')}</Td>
                                    <Td isNumeric fontWeight="bold">{this.props.number_of_projects}</Td>
                                    <Td isNumeric>{Math.round((this.props.number_of_projects / this.state.next_level_data.number_of_projects) * 100)}%</Td>
                                    <Td isNumeric fontWeight="bold">{this.state.next_level_data.number_of_projects}</Td>
                                </Tr>
                                <Tr>
                                    <Td>{i18n.t('statsTable.tableDt2')}</Td>
                                    <Td isNumeric fontWeight="bold">{this.props.number_of_missions}</Td>
                                    <Td isNumeric>{Math.round((this.props.number_of_missions / this.state.next_level_data.number_of_missions) * 100)}%</Td>
                                    <Td isNumeric fontWeight="bold">{this.state.next_level_data.number_of_missions}</Td>
                                </Tr>
                                <Tr>
                                    <Td>{i18n.t('statsTable.tableDt3')}</Td>
                                    <Td isNumeric fontWeight="bold">{this.props.number_of_divergence_points}</Td>
                                    <Td isNumeric>{Math.round((this.props.number_of_divergence_points / this.state.next_level_data.number_of_divergence_points) * 100)}%</Td>
                                    <Td isNumeric fontWeight="bold">{this.state.next_level_data.number_of_divergence_points}</Td>
                                </Tr>
                                <Tr>
                                    <Td>{i18n.t('statsTable.tableDt4')}</Td>
                                    <Td isNumeric fontWeight="bold">{this.props.number_of_convergence_points}</Td>
                                    <Td isNumeric>{Math.round((this.props.number_of_convergence_points / this.state.next_level_data.number_of_convergence_points) * 100)}%</Td>
                                    <Td isNumeric fontWeight="bold">{this.state.next_level_data.number_of_convergence_points}</Td>
                                </Tr>
                                <Tr>
                                    <Td>{i18n.t('statsTable.tableDt5')}</Td>
                                    <Td isNumeric fontWeight="bold">{this.props.number_of_conversation_points}</Td>
                                    <Td isNumeric>{Math.round((this.props.number_of_conversation_points / this.state.next_level_data.number_of_conversation_points) * 100)}%</Td>
                                    <Td isNumeric fontWeight="bold">{this.state.next_level_data.number_of_conversation_points}</Td>
                                </Tr>
                                <Tr>
                                    <Td>{i18n.t('statsTable.tableDt6')}</Td>
                                    <Td isNumeric fontWeight="bold">{this.props.number_of_replies_from_user}</Td>
                                    <Td isNumeric>{Math.round((this.props.number_of_replies_from_user / this.state.next_level_data.number_of_replies_from_user) * 100)}%</Td>
                                    <Td isNumeric fontWeight="bold">{this.state.next_level_data.number_of_replies_from_user}</Td>
                                </Tr>
                                <Tr>
                                    <Td>{i18n.t('statsTable.tableDt7')}</Td>
                                    <Td isNumeric fontWeight="bold">{this.props.number_of_comment_replies_from_user}</Td>
                                    <Td isNumeric>{Math.round((this.props.number_of_comment_replies_from_user / this.state.next_level_data.number_of_comment_replies_from_user) * 100)}%</Td>
                                    <Td isNumeric fontWeight="bold">{this.state.next_level_data.number_of_comment_replies_from_user}</Td>
                                </Tr>

                                {this.props.cert_type === 'mentor' ? (
                                    <Tr>
                                        <Td>{i18n.t('statsTable.tableDt8')}</Td>
                                        <Td isNumeric fontWeight="bold">{this.props.number_of_mentorships}</Td>
                                        <Td isNumeric>{Math.round((this.props.number_of_mentorships / this.state.next_level_data.number_of_mentorships) * 100)}%</Td>
                                        <Td isNumeric fontWeight="bold">{this.state.next_level_data.number_of_mentorships}</Td>
                                    </Tr>
                                ) : (
                                    <Tr></Tr>
                                )}

                            </Tbody>
                            <TableCaption textAlign="right">{i18n.t('statsTable.caption')}</TableCaption>
                        </Table>
                    </Box>
                </Box>
            </ChakraProvider >
        )
    }
}
export default StatsTable;