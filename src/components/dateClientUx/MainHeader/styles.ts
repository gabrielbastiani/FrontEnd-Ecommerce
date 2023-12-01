import styled from "styled-components";

export const Container = styled.div`
  grid-area: MH;
  background-color: ${(props) => props?.theme?.colors?.white};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  border-bottom: 1px solid ${(props) => props?.theme?.colors?.black};
`;

export const Profile = styled.div`
  color: ${(props) => props?.theme?.colors?.black};

  @media (max-width: 600px) {
    margin-left: 200px;
  }
`;

export const Welcome = styled.h3``;

export const UserName = styled.span`
  text-decoration: none;
  color: ${(props) => props?.theme?.colors?.black};
`;

export const NotificationBell = styled.div`
  display: flex;
  align-items: center;
  margin: 20px;
  cursor: pointer;

  svg {
    color: ${(props) => props.theme.colors.black};
  }
`;

export const DropDownContent = styled.div`
  height: 58vh;
  overflow-y: auto;
  right: 0;
  top: 170px;
  padding: 20px;
  position: absolute;
  background-color: ${(props) => props?.theme?.colors?.white};
  color: ${(props) => props?.theme?.colors?.black};
  width: 33%;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.7);
  z-index: 99;
`;

export const Title = styled.h2`
  color: ${(props) => props?.theme?.colors?.black};
  margin-bottom: 25px;
`;

export const BlockButtonsNotification = styled.div`
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
`;

export const AllViewd = styled.button`
  background: transparent;
  color: ${(props) => props.theme.colors.black};
`;

export const ClearNotifications = styled.button`
  background-color: ${(props) => props.theme.colors.warning};
  color: ${(props) => props.theme.colors.white};
  padding: 8px;
`;

export const LinkNotification = styled.a`
  color: inherit;
`;

export const BlockNotification = styled.div`
  border: 1px solid ${(props) => props?.theme?.colors?.black};
  margin-bottom: 15px;
  display: flex;
  align-items: center;

  svg {
    margin: 13px;
  }
`;

export const BoxIcons = styled.div``;

export const Block = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
`;

export const Menssages = styled.span`
  padding-bottom: 12px;
  color: ${(props) => props.theme.colors.black};
`;

export const ClockBlock = styled.div`
  display: flex;
  align-items: center;
`;

export const DataNotification = styled.span`
  color: ${(props) => props.theme.colors.black};
`;

export const Viewed = styled.strong`
  color: ${(props) => props.theme.colors.warning};
  font-style: italic;
  padding-bottom: 7px;
`;