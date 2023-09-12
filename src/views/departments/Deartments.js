import React, { useState } from 'react';
import { Container, Grid, Row, Col } from 'rsuite';
import { Table } from 'rsuite';
import { Stack, Button, IconButton} from 'rsuite';
import { Link } from 'react-router-dom';
import EditIcon from '@rsuite/icons/Edit';
const { Column, HeaderCell, Cell } = Table;

const Deartments = () => {

  const sampleData = [
    { id: 1, department: 'Web Development', lastName: 'Hammad', city: 'Mhow' },
    { id: 2, department: 'Marketing', lastName: 'Verma', city: 'Indore' },
    { id: 3, department: 'App Development', lastName: 'Malik', city: 'Raipur' },
    { id: 4, department: 'Support', lastName: 'Kapoor', city: 'Rau' },
    { id: 5, department: 'Accounts', lastName: 'Singh', city: 'Dewas' },
    { id: 6, department: 'PHP Open Source', lastName: 'Singh', city: 'Dewas' },
    { id: 7, department: 'Design and Printing', lastName: 'Singh', city: 'Dewas' }
  ]

  return (
    <Container>

      <Row className="show-grid">
        <Col lg={18}>
          <div className='card'>
            <div className='card-header'>
              <h3 className='card-title'>Departments List</h3>
            </div>
            <div className='card-body'>
              <Table
                height={500}
                data={sampleData}>

                <Column width={500}>
                  <HeaderCell>Department</HeaderCell>
                  <Cell dataKey="department" />
                </Column>
                <Column width={500}>
                  <HeaderCell>Action</HeaderCell>
                  <Cell >
                    <Stack wrap spacing={6}>
                    <IconButton size="sm" icon={<EditIcon />} />
                      <Button>Item 2</Button>
                      <Button>Item 3</Button>
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
