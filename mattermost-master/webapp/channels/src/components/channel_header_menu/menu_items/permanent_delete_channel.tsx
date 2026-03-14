// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React, {memo} from 'react';
import {FormattedMessage} from 'react-intl';
import {useDispatch} from 'react-redux';

import {TrashCanOutlineIcon} from '@mattermost/compass-icons/components';
import type {Channel} from '@mattermost/types/channels';

import {permanentDeleteChannel} from 'actions/views/channel';
import {openModal} from 'actions/views/modals';

import ConfirmModalRedux from 'components/confirm_modal_redux';
import * as Menu from 'components/menu';

const MODAL_ID = 'permanent_delete_channel_confirm_modal';

type Props = {
    channel: Channel;
    id?: string;
}

const PermanentDeleteChannel = ({channel, id}: Props) => {
    const dispatch = useDispatch();

    const handlePermanentDelete = () => {
        dispatch(openModal({
            modalId: MODAL_ID,
            dialogType: ConfirmModalRedux,
            dialogProps: {
                title: (
                    <FormattedMessage
                        id='channel_header.permanent_delete.title'
                        defaultMessage='永久删除频道'
                    />
                ),
                message: (
                    <FormattedMessage
                        id='channel_header.permanent_delete.message'
                        defaultMessage='确定要永久删除频道 <strong>{displayName}</strong> 吗？频道及其所有消息将被物理删除，且不可恢复。'
                        values={{
                            displayName: channel.display_name,
                            strong: (chunks: React.ReactNode) => <strong>{chunks}</strong>,
                        }}
                    />
                ),
                confirmButtonClass: 'btn btn-danger',
                confirmButtonText: (
                    <FormattedMessage
                        id='channel_header.permanent_delete.confirm'
                        defaultMessage='永久删除'
                    />
                ),
                onConfirm: () => dispatch(permanentDeleteChannel(channel.id)),
            },
        }));
    };

    return (
        <Menu.Item
            id={id}
            leadingElement={<TrashCanOutlineIcon size={18}/>}
            onClick={handlePermanentDelete}
            labels={
                <FormattedMessage
                    id='channel_header.permanent_delete'
                    defaultMessage='永久删除'
                />
            }
            isDestructive={true}
        />
    );
};

export default memo(PermanentDeleteChannel);
