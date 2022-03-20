import React, { useState, useEffect } from 'react';
import { useQueryWithStore, Loading, Error } from 'react-admin';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const WeightStats = ({ record }) => {
  const classes = useStyles();

  const [weightStats, setWeightStats] = useState([]);

  const { loaded, error, data } = useQueryWithStore({
    type: 'getOne',
    resource: 'weights',
    payload: { id: 'statistics' },
  });

  useEffect(() => {
    if (data) {
      setWeightStats([data]);
    }
  }, [setWeightStats, data]);

  if (!loaded) {
    return <Loading />;
  }

  if (error) {
    return <Error />;
  }

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell align='center'>Statistics</TableCell>
            <TableCell align='center'>Max</TableCell>
            <TableCell align='center'>Min</TableCell>
            <TableCell align='center'>Perbedaan</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {weightStats.map((row) => (
            <TableRow key={row.id}>
              <TableCell align='center'>Rata-rata</TableCell>
              <TableCell align='center' key={row.avgMinimum}>
                {row.avgMinimum}
              </TableCell>
              <TableCell align='center' key={row.avgMaximum}>
                {row.avgMaximum}
              </TableCell>
              <TableCell align='center' key={row.avgDifferences}>
                {row.avgDifferences}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default WeightStats;
