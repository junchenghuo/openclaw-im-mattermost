// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React from 'react';

import * as channelActions from 'actions/views/channel';
import * as modalActions from 'actions/views/modals';

import ConfirmModalRedux from 'components/confirm_modal_redux';
import {WithTestMenuContext} from 'components/menu/menu_context_test';

import {renderWithContext, screen, userEvent} from 'tests/react_testing_utils';
import {TestHelper} from 'utils/test_helper';

import PermanentDeleteChannel from './permanent_delete_channel';

describe('components/ChannelHeaderMenu/MenuItems/PermanentDeleteChannel', () => {
    beforeEach(() => {
        jest.spyOn(modalActions, 'openModal');
        jest.spyOn(channelActions, 'permanentDeleteChannel');
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('should open confirm modal and dispatch permanent delete after confirmation', async () => {
        const channel = TestHelper.getChannelMock({
            display_name: '无限世界（元宇宙）',
        });

        renderWithContext(
            <WithTestMenuContext>
                <PermanentDeleteChannel channel={channel}/>
            </WithTestMenuContext>,
        );

        const menuItem = screen.getByText('永久删除');
        expect(menuItem).toBeInTheDocument();

        await userEvent.click(menuItem);

        expect(modalActions.openModal).toHaveBeenCalledTimes(1);
        const openModalPayload = (modalActions.openModal as jest.Mock).mock.calls[0][0];
        expect(openModalPayload.dialogType).toBe(ConfirmModalRedux);
        expect(typeof openModalPayload.dialogProps.onConfirm).toBe('function');

        await openModalPayload.dialogProps.onConfirm();
        expect(channelActions.permanentDeleteChannel).toHaveBeenCalledWith(channel.id);
    });
});
