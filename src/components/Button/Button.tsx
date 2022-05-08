import React, { ReactNode } from 'react';
import ReactTooltip from 'react-tooltip';

import styled, { css } from 'styled-components';

const AminoButton = styled.button<Pick<ButtonProps, 'size'>>`
  position: relative;
  outline: none;
  height: 32px;
  line-height: 32px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 0 8px;
  border-radius: 5px;
  transition: 0.5s all ease;
  font-weight: 500;
  user-select: none;
  letter-spacing: normal;

  svg path {
    fill: currentColor;
  }

  &.only-icon {
    width: 32px;
    padding: 0;
  }

  &:active,
  &:focus {
    outline: none;
  }

  &:not(.only-icon).has-icon {
    &.icon-right {
      svg {
        margin-left: 8px;
        margin-right: 0;
      }
    }
    svg {
      margin-right: 8px;
      margin-left: 0;
    }
  }

  &[disabled] {
    cursor: not-allowed;
    box-shadow: none;
    opacity: 0.5;
  }
  ${props =>
    props.size === 'md' &&
    css`
      height: 40px;
      line-height: 40px;
      &.only-icon {
        width: 40px;
      }
    `}

  ${props =>
    props.size === 'lg' &&
    css`
      height: 48px;
      line-height: 48px;
      &.only-icon {
        width: 48px;
      }
    `}
`;

const Primary = styled(AminoButton)`
  background: blue;
  color: white;

  &:hover {
    opacity: 0.8;
  }
  &:active,
  &:focus {
    background: darkblue;
    color: white;
  }
`;

export type ButtonProps = {
  children?: ReactNode;
  className?: string;
  disabled?: boolean;
  icon?: ReactNode;
  iconRight?: boolean;
  loading?: boolean;
  loadingText?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  size?: 'sm' | 'md' | 'lg';
  tabIndex?: number;
  tooltip?: ReactNode;
  type?: 'button' | 'reset' | 'submit';
};

export const Button = ({
  children,
  className,
  disabled,
  icon,
  iconRight,
  loading,
  loadingText,
  onClick,
  size,
  tabIndex,
  tooltip,
  type = 'button',
}: ButtonProps) => {
  const content = loading ? (
    <>{loadingText}</>
  ) : (
    <>
      {tooltip && <ReactTooltip />}
      {!iconRight && icon}
      {children}
      {iconRight && icon}
    </>
  );

  const buttonClassName = [
    className || '',
    icon && !children ? 'only-icon' : '',
    iconRight ? 'icon-right' : '',
    icon ? 'has-icon' : '',
  ].join(' ');

  return (
    <Primary
      className={buttonClassName}
      data-tip={tooltip}
      onClick={onClick}
      tabIndex={tabIndex}
      size={size || 'sm'}
      disabled={disabled}
      type={type}
    >
      {content}
    </Primary>
  );
};
