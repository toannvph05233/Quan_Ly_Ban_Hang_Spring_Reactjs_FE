// material-ui
import {useTheme, styled} from "@mui/material/styles";
import {
  Avatar,
  Chip,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Typography
} from '@mui/material';

import User1 from "assets/images/e3d1cedf865795c06ce280f649a124ca.jpg";
// import { getAllHoaDonPending } from '../../../../service/BanHangTaiQuayService';
import React from 'react';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';

// styles
const ListItemWrapper = styled("div")(({theme}) => ({
  cursor: "pointer",
  padding: 16,
  "&:hover": {
    background: theme.palette.primary.light
  },
  "& .MuiListItem-root": {
    padding: 0
  }
}));

function NotificationList({listHoaDonPending}) {
  const theme = useTheme();
  const navigate = useNavigate();
  return (
    <List
      sx={{
        width: "100%",
        maxWidth: 330,
        minWidth: 330,
        maxHeght: 500,
        py: 0,
        borderRadius: "10px",
        [theme.breakpoints.down("md")]: {
          maxWidth: 300
        },
        "& .MuiListItemSecondaryAction-root": {
          top: 22
        },
        "& .MuiDivider-root": {
          my: 0
        },
        "& .list-container": {
          pl: 7
        }
      }}
    >
      {listHoaDonPending.map((row) => (
      <ListItemWrapper key={row.id} onClick={() => navigate(`hoa-don/chi-tiet-hoa-don/${row.id}`)}>
        <ListItem alignItems="center">
          <ListItemAvatar>
            <Avatar alt="John Doe" src={User1} />
          </ListItemAvatar>
          <ListItemText primary="Đơn hàng mới" />
          <ListItemSecondaryAction>
            <Grid container justifyContent="flex-end">
              <Grid item xs={12}>
                <Typography variant="caption" display="block" gutterBottom>
                  {dayjs(row?.ngayTao).format("DD/MM/YYYY")}
                </Typography>
              </Grid>
            </Grid>
          </ListItemSecondaryAction>
        </ListItem>
        <Grid container direction="column" className="list-container">
          <Grid item xs={12} sx={{pb: 2}}>
            <Typography variant="subtitle2"> {row?.ma} đang chờ bạn xác nhận</Typography>
          </Grid>
          <Grid item xs={12}>
            <Grid container>
              <Grid item>
                <Chip
                  style={{color: "white", float: "right"}}
                  label={row?.trangThai === "PENDING" ? "Chi tiết" : null}
                  color="error"
                  size="small"
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </ListItemWrapper>
      ))}
    </List>
  );
}

export default NotificationList;
