'use client';
import { createRef, forwardRef, Fragment, ReactNode, useEffect, useRef } from 'react';
import styled from '@emotion/styled';

import { GridColDef } from '@mui/x-data-grid';

import { TableVirtuoso, TableComponents } from 'react-virtuoso';
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableFooter from '@mui/material/TableFooter';

import Paper from '@mui/material/Paper';
import { Any } from 'constants/types';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import TableBody from '@mui/material/TableBody';
import AtsPaper from '@/components/AtsPaper';
import { numberFormat } from 'locales/number';

export type VirtualGridColDef = GridColDef & {
  isSum?: boolean;
  pinnedColumn?: string;
  maxWidth?: number;
  fieldToSum?: string;
};

type Props<D> = {
  values: D[];
  columns: VirtualGridColDef[];
  hideFooter?: boolean;
  slots?: {
    footer?: ReactNode;
  };
};

const scrollerComponent = forwardRef<HTMLDivElement>((props, ref) => (
  <TableContainer component={Paper} {...props} ref={ref} />
));

const tableHeadComponent = forwardRef<HTMLTableSectionElement>((props, ref) => <TableHead {...props} ref={ref} />);
const tableBodyComponent = forwardRef<HTMLTableSectionElement>((props, ref) => <TableBody {...props} ref={ref} />);
const tableFooterComponent = forwardRef<HTMLTableSectionElement>((props, ref) => <TableFooter {...props} ref={ref} />);

scrollerComponent.displayName = 'scrollerComponent';
tableHeadComponent.displayName = 'tableHeadComponent';
tableBodyComponent.displayName = 'tableBodyComponent';
tableFooterComponent.displayName = 'tableFooterComponent';

const DEFAULT_MIN_WIDTH_CELL = 70;
const DEFAULT_MAX_WIDTH_CELL = 800;

export default function VirtualTable<T extends Any>({ values, columns, slots, hideFooter }: Props<T>) {
  const VirtuosoTableComponents: TableComponents<T> = {
    Scroller: scrollerComponent,
    Table: props => <Table {...props} sx={{ borderCollapse: 'separate', tableLayout: 'fixed' }} />,
    TableHead: tableHeadComponent,
    TableRow,
    TableBody: tableBodyComponent,
    TableFoot: tableFooterComponent,
  };

  useEffect(() => {
    document.onmousemove = handleOnMouseMove;
    document.onmouseup = handleOnMouseUp;
    return () => {
      document.onmousemove = null;
      document.onmouseup = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columnRefs = columns.map(() => createRef<Any>());
  const isResizing = useRef(-1);

  const setCursorDocument = (isResizing: boolean) => {
    document.body.style.cursor = isResizing ? 'col-resize' : 'auto';
  };

  const adjustWidthColumn = (index: number, width: number) => {
    const minWidth = columns[index]?.minWidth ?? DEFAULT_MIN_WIDTH_CELL;
    const maxWidth = DEFAULT_MAX_WIDTH_CELL;
    const newWidth = width > maxWidth ? maxWidth : width < minWidth ? minWidth : width;

    columnRefs[index].current.parentElement.style.width = newWidth + 'px';
  };

  const handleOnMouseMove = (e: MouseEvent) => {
    if (isResizing.current >= 0) {
      const newWidth = e.clientX - columnRefs[isResizing.current].current.parentElement?.getBoundingClientRect().left;
      adjustWidthColumn(isResizing.current, newWidth);
    }
  };

  const handleOnMouseUp = () => {
    // console.log('end resize');
    isResizing.current = -1;
    setCursorDocument(false);
  };

  const onClickResizeColumn = (index: number) => {
    // console.log('start resize');
    isResizing.current = index;
    setCursorDocument(true);
  };

  const rowContent = (_index: number, row: T) => {
    return (
      <Fragment>
        {columns.map(column => (
          <TableCell
            colSpan={column?.colSpan as number}
            key={column.field}
            align={column.align}
            sx={{
              borderRight: '1px solid rgba(224, 224, 224, 1)',
            }}
          >
            <Tooltip title={<>{row[column.field as keyof T]}</>}>
              <Box
                sx={{
                  textOverflow: 'ellipsis',
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                  cursor: 'pointer',
                }}
              >
                <>
                  {column.type == 'number'
                    ? numberFormat(+row[column.field as keyof T] || 0)
                    : row[column.field as keyof T]}
                </>
              </Box>
            </Tooltip>
          </TableCell>
        ))}
      </Fragment>
    );
  };

  const fixedHeaderContent = () => {
    return (
      <TableRow>
        {columns.map((column, colIndex) => (
          <TableCell
            colSpan={column?.colSpan as number}
            key={column.field}
            variant="head"
            style={{ width: column.width }}
            sx={{
              backgroundColor: '#1853A4',
              color: '#fff',
              borderRight: '1px solid #3C6EB3',
              position: 'relative',
            }}
          >
            <div
              onMouseDown={() => onClickResizeColumn(colIndex)}
              ref={columnRefs[colIndex]}
              style={{
                position: 'absolute',
                height: '100%',
                width: '4px',
                top: 0,
                right: '-2px',
                cursor: 'col-resize',
                zIndex: 999,
              }}
            />
            {column.headerName}
          </TableCell>
        ))}
      </TableRow>
    );
  };

  const fixedFooterContent = () => {
    // TODO
    const handleSum = (field: string) => {
      const sum = values.reduce((total, current) => {
        return total + (+current[field as keyof T] || 0);
      }, 0);

      return numberFormat(sum);
    };

    return hideFooter ? null : (
      <TableRow>
        {slots?.footer ??
          columns.map(column => (
            <TableCell
              key={column.field}
              colSpan={column?.colSpan as number}
              variant="footer"
              align={column.align}
              sx={{
                width: column.width,
                backgroundColor: 'rgb(239, 83, 80)',
                color: '#fff',
                fontWeight: 'bold',
                borderLeft: column.isSum ? '1px solid rgba(224, 224, 224, 1)' : '',
              }}
            >
              {column.pinnedColumn ?? ''}
              {column.isSum ? handleSum(column?.fieldToSum ?? column?.field) : ''}
            </TableCell>
          ))}
      </TableRow>
    );
  };

  return (
    <VirtualTableStyled>
      <AtsPaper style={{ height: 'calc(100vh - 450px)', width: '100%', position: 'relative' }}>
        {values.length ? (
          <TableVirtuoso
            data={values}
            components={VirtuosoTableComponents}
            fixedHeaderContent={fixedHeaderContent}
            itemContent={rowContent}
            fixedFooterContent={fixedFooterContent}
          />
        ) : (
          <Stack alignItems="center" justifyContent="center" height="100%">
            행이 없습니다.
          </Stack>
        )}
      </AtsPaper>
    </VirtualTableStyled>
  );
}

const VirtualTableStyled = styled('div')`
  tfoot {
    bottom: -2px !important;
  }
`;
