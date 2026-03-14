// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React, {memo} from 'react';
import {FormattedMessage} from 'react-intl';
import {useDispatch} from 'react-redux';

import {TrashCanOutlineIcon} from '@mattermost/compass-icons/components';
import type {Channel} from '@mattermost/types/channels';

import {clearChannelHistoryPermanently} from 'actions/views/channel';
import {openModal} from 'actions/views/modals';

import ConfirmModalRedux from 'components/confirm_modal_redux';
import * as Menu from 'components/menu';

const MODAL_ID = 'clear_channel_history_confirm_modal';

type Props = {
    channel: Channel;
    id?: string;
}

const ClearChannelHistory = ({channel, id}: Props) => {
    const dispatch = useDispatch();

    const handleClearHistory = () => {
        dispatch(openModal({
            modalId: MODAL_ID,
            dialogType: ConfirmModalRedux,
            dialogProps: {
                title: (
                    <FormattedMessage
                        id='channel_header.clear_history.title'
                        defaultMessage='清除频道记录'
                    />
                ),
                message: (
                    <FormattedMessage
                        id='channel_header.clear_history.message'
                        defaultMessage='确定要清除 <strong>{displayName}</strong> 的全部消息记录吗？此操作不可撤销。'
                        values={{
                            displayName: channel.display_name,
                            strong: (chunks: React.ReactNode) => <strong>{chunks}</strong>,
                        }}
                    />
                ),
                confirmButtonClass: 'btn btn-danger',
                confirmButtonText: (
                    <FormattedMessage
                        id='channel_header.clear_history.confirm'
                        defaultMessage='清除记录'
                    />
                ),
                onConfirm: () => dispatch(clearChannelHistoryPermanently(channel.id)),
            },
        }));
    };

    return (
        <Menu.Item
            id={id}
            leadingElement={<TrashCanOutlineIcon size={18}/>}
            onClick={handleClearHistory}
            labels={
                <FormattedMessage
                    id='channel_header.clear_history'
                    defaultMessage='清除记录'
                />
            }
            isDestructive={true}
        />
    );
};

export default memo(ClearChannelHistory);
