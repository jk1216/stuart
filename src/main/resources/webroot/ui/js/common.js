var datatables_paging_type = 'full_numbers';

var datatables_paging_len = 10;

var datatables_no_data = {
    'draw': 1,
    'recordsTotal': 0,
    'recordsFiltered': 0,
    'data': []
};

var alert_failed_tag = '<i class="fa fa-fw fa-exclamation-circle" style="color:#dd4b39"></i>&nbsp;';

var alert_succeeded_tag = '<i class="fa fa-fw fa-check-circle" style="color:#00a65a"></i>&nbsp;';

function datatablesLanguage() {
    return {
        'processing': '<i class="fa fa-circle-o-notch fa-spin"></i>&nbsp;' + locale_messages.datatables_processing,
        'zeroRecords': locale_messages.datatables_zeroRecords,
        'info': locale_messages.datatables_info,
        'infoEmpty': locale_messages.datatables_infoEmpty,
        'paginate': {
            'first': locale_messages.datatables_paginate_first,
            'previous': locale_messages.datatables_paginate_previous,
            'next': locale_messages.datatables_paginate_next,
            'last': locale_messages.datatables_paginate_last
        },
        'search': locale_messages.datatables_search
    };
}

function datatablesReload(table, pageNum, dataLen, rowDeleted) {
    var pageNo = pageNum - 1;

    if (table && table.ajax && table.ajax.reload && table.ajax.reload instanceof Function) {
        if (rowDeleted) {
            if (dataLen === 1) {
                table.page(pageNo - 1).ajax.reload(null, false);
            } else {
                table.ajax.reload(null, false);
            }
        } else {
            table.ajax.reload(null, false);
        }
    }
}

function datatablesRowData(table, obj) {
    if (table && table.row && table.row instanceof Function) {
        return table.row($(obj).closest("tr")).data();
    } else {
        return null;
    }
}

function initializeModal(modal, confirm) {
    $(modal + ' .form-group').removeClass('has-error');

    $(modal + ' input').val('');

    $(modal + ' .help-block').hide();

    var $confirm = $(confirm);

    $confirm.html($confirm.attr('prev-text'));

    $confirm.removeAttr('prev-text disabled');
}

function disableConfirm(confirm) {
    var $confirm = $(confirm);

    $confirm.attr({ 'prev-text': $confirm.text(), 'disabled': 'disabled' });

    $confirm.html('<i class="fa fa-circle-o-notch fa-spin"></i>&nbsp;' + locale_messages.common_btn_processing);
}

function enableConfirm(confirm) {
    var $confirm = $(confirm);

    $confirm.html($confirm.attr('prev-text'));

    $confirm.removeAttr('prev-text disabled');
}

function alertMessage(title, content, failed) {
    $('#common-alert-title').html(title);

    if (failed) {
        $('#common-alert-content').html(alert_failed_tag + content);
    } else {
        $('#common-alert-content').html(alert_succeeded_tag + content);
    }

    $('#modal-common-alert').modal('show');
}

function alertSystemException() {
    alertMessage(locale_messages.common_alert_title, locale_messages.common_alert_error_content, true);
}