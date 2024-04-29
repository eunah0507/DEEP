import styled from "styled-components";

export const SignUpWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin: auto 0;
`;

export const SignUpContainer = styled.div`
    width: 400px;

    .logo {
        width: 100%;
        margin-bottom: 50px;
        text-align: center;
    }

    .logo img {
        width: 130px;
    }

    .sign_up_success {
        text-align: center;
    }

    .sign_up_success h3 {
        margin-bottom: 20px;
        font-size: 2.4rem;
        font-weight: 500;
    }

    .sign_up_success span {
        display: block;
        margin-bottom: 10px;
        color: #666;
        font-size: 1.6rem;
    }

    .sign_up_success span:last-child {
        margin-bottom: 50px;
    }
`;
