<?php



namespace index\forms;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Form\FormEvents;
use Symfony\Component\Form\FormEvent;
use Symfony\Component\Form\FormError;

/**
 *
 * @package Core
 * @link http://ican.openacalendar.org/ OpenACalendar Open Source Software
 * @license http://ican.openacalendar.org/license.html 3-clause BSD
 * @copyright (c) 2013-2014, JMB Technology Limited, http://jmbtechnology.co.uk/
 * @author James Baster <james@jarofgreen.co.uk>
 */
class LogInUserForm  extends AbstractType {
	
	
	public function buildForm(FormBuilderInterface $builder, array $options) {
		
		$builder->add('details', 'text', array(
			'label'=>'Email or Username',
			'required'=>true, 
			'attr' => array('autofocus' => 'autofocus')
		));
		$builder->add('password', 'password', array(
			'label'=>'Password',
			'required'=>true
		));
		
		$builder->add("rememberme",
				"checkbox",
					array(
						'required'=>false,
						'label'=>'Remember Me'
					)
			    );
		$builder->get('rememberme')->setData( true );
		
	}
	
	public function getName() {
		return 'LogInUserForm';
	}
	
	public function getDefaultOptions(array $options) {
		return array(
		);
	}
	
}

