import React, { useState } from 'react';
import { Container, Grid, Row, Col } from 'rsuite';
import { Table } from 'rsuite';
import { Stack, Button, IconButton, Divider } from 'rsuite';
import { Link } from 'react-router-dom';
import EditIcon from '@rsuite/icons/Edit';
import TrashIcon from '@rsuite/icons/Trash';
import ReuseModal from '../../components/reuseModal';
const { Column, HeaderCell, Cell } = Table;

const Deartments = () => {

  const sampleData = [
    { id: 1, department: 'Web Development' },
    { id: 2, department: 'Marketing' },
    { id: 3, department: 'App Development' },
    { id: 4, department: 'Support' },
    { id: 5, department: 'Accounts' },
    { id: 6, department: 'PHP Open Source' },
    { id: 7, department: 'Design and Printing' }
  ]
  


  return (
    <Container>

      <Row className="show-grid">
        <Col lg={18}>
          <div className='card'>
            <div className='card-header'>
              <Stack>
                <h3 className='card-title'>Departments List</h3>
                <Button appearance="primary">+ Addd</Button>
               
              </Stack>
            </div>
            <Divider></Divider>
            <div className='card-body'>
              <Table
                height={400}
                data={sampleData}>
                <Column>
                  <HeaderCell>S.No</HeaderCell>
                  <Cell dataKey="id" />
                </Column>
                <Column flexGrow={1}>
                  <HeaderCell>Department</HeaderCell>
                  <Cell dataKey="department" />
                </Column>
                <Column flexGrow={1}>
                  <HeaderCell>Action</HeaderCell>
                  <Cell >
                    <Stack wrap spacing={6}>
                      <IconButton size="sm" icon={<EditIcon />} />
                      <IconButton size="sm" icon={<TrashIcon />} />
                    </Stack>
                  </Cell>
                </Column>
              </Table>
            </div>
          </div>
        </Col>
      </Row>

    </Container>
  )
}
export default Deartments;
