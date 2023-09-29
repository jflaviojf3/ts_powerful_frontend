import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer, CartesianGrid } from 'recharts';
import Title from '../../../layouts/dashboardMui/Title';

export default function Chart({ dados }) {
  const theme = useTheme();

  return (
    <React.Fragment>
      <Title align="center" variant="h5">Total de Tarefas no Mês</Title>
      <ResponsiveContainer>

      <LineChart
          width={500}
          height={300}
          data={dados}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
         
         <CartesianGrid strokeDasharray="3 2" />

          <XAxis
            dataKey="dia"
            stroke={theme.palette.text.secondary}
            label={{ value: "Dias do Mês", position: "insideBottomCenter", dy: 15, fontSize: ".9rem"}}
          >
            </XAxis>
          <YAxis
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
            label={{ value: "Quantidade de Tarefas", position: "insideLeftCenter", dx: -20, fontSize: ".9rem", angle: 270}}
          >
            
          </YAxis>
          <Line
            isAnimationActive={false}
            type="monotone"
            dataKey="quantidade"
            stroke={theme.palette.primary.main}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}