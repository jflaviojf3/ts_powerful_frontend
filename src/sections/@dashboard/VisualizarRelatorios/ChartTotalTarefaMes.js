import * as React from "react";
import { useTheme } from "@mui/material/styles";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Label,
  ResponsiveContainer,
  CartesianGrid,
  BarChart,
  Tooltip,
  Legend,
  Bar,
  Cell,
} from "recharts";
import Title from "../../../layouts/dashboardMui/Title";

function gerarCorAleatoria() {
  let n = (Math.random() * 0xfffff * 1000000).toString(16);
  return "#" + n.slice(0, 6);
}

export default function ChartTotalTarefasPorProjeto({ dados }) {
  const theme = useTheme();

  return (
    <React.Fragment>
      <Title>Total de Tarefas por Projetos</Title>
      <ResponsiveContainer>
        <BarChart width={730} height={250} data={dados}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="projeto" enableBackground={true}  label={{ value: "Projetos", position: "insideBottomCenter", dy: 12, fontSize: ".9rem"}}/>
          <YAxis label={{ value: "Quantidade de Tarefas", position: "insideLeftCenter", dx: -20, fontSize: ".9rem", angle: 270}} />
          <Tooltip />
          <Bar dataKey="quantidade" >
            {dados && dados.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={gerarCorAleatoria()} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}