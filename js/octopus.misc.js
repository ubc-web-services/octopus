/*
 * File: octopus.misc.js
 *
 * Desc: js for interacting with various site elements
 *
 */
(function ($) {
  Drupal.behaviors.octopusMisc = {
    attach: function(context, settings) {

      // add toggle attribute function
      $.fn.toggleAttr = function (attr, val) {
        var hasAttr = $(this).attr(attr);
        if (hasAttr) {
          $(this).removeAttr(attr);
        } else {
          $(this).attr(attr, val);
        }
        return this;
      };

      // add toggle attribute value function
      $.fn.toggleAttrVal = function (attr, val1, val2) {
        var currentValue = $(this).attr(attr);
        if (currentValue === val1) {
          $(this).attr(attr, val2);
          return this;
        }
        if (currentValue === val2) {
          $(this).attr(attr, val1);
          return this;
        }
        $(this).attr(attr, val1);
        return this;
      };

      // show hidden content when trigger is clicked
      $('.js-reveal__trigger', context).on('click', function (e) {
        e.preventDefault();
        $(this).find('use').toggleAttrVal('xlink:href', '#icon-minus', '#icon-plus');
        $(this).toggleClass('is-open').closest('.js-reveal__parent').next('.js-reveal__target')
          .toggleClass('is-open').toggleAttr('hidden', true);
      });

      // remove message from dom when dismiss button clicked
      $('[data-dismiss]', context).on('click', function (e) {
        e.preventDefault();
        $(this).closest('.message').remove();
      });

      // move between selected tabs and add/remove active classes
      $('.js-tabcordion__trigger[data-tab]', context).on('click', function (e) {
        e.preventDefault();
        $(this).closest('.tabcordion').find('[data-tab=' + $(this).data('tab') + ']').addClass(
          'is-active').siblings('[data-tab]').removeClass('is-active');
        $(this).closest('.tabcordion').find('.tabcordion__content-wrapper [data-content=' + $(this)
          .data('tab') + ']').addClass('is-active').siblings('[data-content]').removeClass(
          'is-active');
      });

    }
  }
}(jQuery));
