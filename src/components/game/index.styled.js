import {styled} from "styled-components";

export const Grids = styled.div`
    width: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: center;
`;
export const PauseGame = styled.p`
    width: 100%;
    margin: 32px 0 0 0;
    color: #fff;
    font-size: 24px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;

export const EndGame = styled.p`
    width: 100%;
    margin: 32px 0 0 0;
    color: #fff;
    font-size: 24px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;

export const ButtonRestart = styled.button`
    margin: 8px 0 16px 0;
`;
export const ButtonStop = styled.button`
    margin: 0 0 32px 0;
`;
export const ButtonPause = styled.button`
    margin: 0 0 32px 0;
`;
export const ButtonResume = styled.button`
    margin: 0 0 32px 0;
`;
export const Container = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;

const Root = styled.div`
    width: 100%;
    max-width: 900px;
    margin: 0 auto;
`;

export default Root;
